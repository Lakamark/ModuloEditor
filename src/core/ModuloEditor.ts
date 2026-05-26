import type {
    EditorDocument,
    ModuloEditorBuilder,
    ModuloEditorOptions
} from "./contracts";
import type {
    EditorPlugin,
    EditorPluginApi
} from "../plugins";
import {
    type EditorCommandContext,
    EditorCommandRegistry,
    type EditorCommandsApi,
    RegistryEditorCommandsApi
} from "../commands";
import {
    DefaultEditorDomResolver,
    type EditorDomResolver,
    type EditorDomSlots
} from "../dom";
import {DefaultEditorDocument} from "./DefaultEditorDocument";
import {setupEditorCommands} from "../commands/setup/setupEditorCommands";
import {DefaultModuloEditorBuilder} from "./Builder";
import type {EditorCssClassMap} from "../dom/contracts";
import {EDITOR_CSS_CLASSES} from "../dom/constants";
import {
    type EditorEventBus, type EditorEventListener,
    type EditorEventMap, type EditorEventUnsubscribe,
    SimpleEditorEventBus
} from "../events";

/**
 * Main editor orchestrator.
 *
 * ModuloEditor connects:
 *
 * - EditorDocument → source of truth
 * - EditorInputAdapter → editing layer
 * - MarkdownProcessor → transforms content to HTML
 * - EditorOutputAdapter → preview renderer
 * - EditorCommandsApi → command execution
 * - EditorPlugin → UI extensions
 *
 * Responsibilities:
 *
 * - initialize editor state
 * - synchronize input → document → preview
 * - execute commands
 * - mount plugins
 * - manage lifecycle (init / destroy)
 */
export class ModuloEditor {
    private readonly document: EditorDocument;
    private readonly input: ModuloEditorOptions["input"];
    private readonly output: ModuloEditorOptions["output"];
    private readonly markdown: ModuloEditorOptions["markdown"];
    private readonly plugins: readonly EditorPlugin[];
    private readonly commands: EditorCommandsApi;
    private readonly root: HTMLElement;
    private readonly domResolver: EditorDomResolver;
    private readonly textareaBridge?: ModuloEditorOptions["textareaBridge"];
    private readonly classes: Required<EditorCssClassMap>;
    private readonly events: EditorEventBus<EditorEventMap>;

    private unsubscribeInputChange?: () => void;
    private readonly changeListeners = new Set<(value: string) => void>();
    private initialized: boolean = false;
    private slots!: EditorDomSlots;

    /**
     * Creates a new ModuloEditor instance.
     *
     * Commands and plugins are registered but not initialized
     * until `init()` is called.
     */
    public constructor(
        root: HTMLElement,
        {
            document = new DefaultEditorDocument(),
            input,
            output,
            markdown,
            commands = [],
            plugins = [],
            builtinCommands = true,
            domResolver,
            textareaBridge,
            classes = {},
        }: ModuloEditorOptions) {
        this.root = root;
        this.document = document;
        this.input = input;
        this.output = output;
        this.markdown = markdown;
        this.plugins = plugins;
        this.domResolver = domResolver ?? new DefaultEditorDomResolver();
        this.textareaBridge = textareaBridge;
        this.events = new SimpleEditorEventBus<EditorEventMap>();

        const registry = new EditorCommandRegistry()

        setupEditorCommands(registry, {
            builtinCommands,
            commands
        });

        this.commands = new RegistryEditorCommandsApi(
            registry,
            () => this.createCommandContext()
        );

        this.classes = {
            ...EDITOR_CSS_CLASSES,
            ...classes,
        };
    }

    /**
     * Creates a new ModuloEditor builder.
     *
     * A root element can be provided for explicit DOM mode, but it is optional
     * when using textarea-based initialization with a DOM initializer.
     *
     * @param root The editor root element or selector.
     * @returns A new ModuloEditor builder instance.
     */
    public static create(root?: string | HTMLElement): ModuloEditorBuilder  {
        return new DefaultModuloEditorBuilder(root);
    }

    /**
     * Initializes the editor.
     *
     * - hydrates input from document
     * - renders initial preview
     * - subscribes to input changes
     * - mounts plugins
     */
    public init(): void {
        if (this.initialized) {
            return;
        }

        this.events.emit('editor:before-init', {
            timestamp: Date.now(),
        });

        this.slots = this.domResolver.resolve(this.root);
        const content = this.document.getRawContent();

        this.input.mount(this.slots.input, content);
        this.textareaBridge?.mount(this.slots.textarea);
        this.textareaBridge?.setValue(content);

        const html = this.markdown.toHtml(content);
        this.output.render(html);
        this.output.mount(this.slots.preview);

        this.unsubscribeInputChange = this.input.onChange((value: string) => {
            this.handleInputChange(value);
        });

        const pluginApi = this.createPluginApi();

        for (const plugin of this.plugins) {
            plugin.setup(pluginApi);
        }

        this.initialized = true;

        this.events.emit('editor:init', {
            timestamp: Date.now(),
        });
    }

    /**
     * Destroys the editor.
     *
     * - unsubscribes input listeners
     * - destroys plugins
     * - destroys adapters
     */
    public destroy(): void {
        if (!this.initialized) {
            return;
        }

        this.events.emit('editor:before-destroy', {
            timestamp: Date.now(),
        });

        this.unsubscribeInputChange?.();
        this.unsubscribeInputChange = undefined;

        for (const plugin of this.plugins) {
            plugin.destroy();
        }

        this.textareaBridge?.destroy();

        this.input.destroy();
        this.output.destroy();

        this.initialized = false;

        this.events.emit('editor:destroy', {
            timestamp: Date.now(),
        });

        this.events.clear();
    }

    /**
     * Registers an editor event listener.
     *
     * This method provides a public subscription API
     * for the internal editor event bus.
     *
     * Listeners may subscribe to:
     *
     * - editor lifecycle events
     * - content synchronization events
     * - command execution events
     *
     * Returns a cleanup callback that unsubscribes
     * the listener from the event bus.
     *
     * @template EventName Event name.
     *
     * @param eventName Event to subscribe to.
     * @param listener Event listener callback.
     *
     * @returns Event unsubscribe callback.
     */
    public on<EventName extends keyof EditorEventMap>(
        eventName: EventName,
        listener:  EditorEventListener<EditorEventMap[EventName]>
    ): EditorEventUnsubscribe {
        return this.events.on(eventName, listener);
    }

    /**
     * Emits an editor event.
     *
     * Mainly intended for advanced integrations,
     * testing and development tooling.
     *
     * @template EventName Event name.
     *
     * @param eventName Event name.
     * @param payload Event payload.
     */
    public emit<EventName extends keyof EditorEventMap>(
        eventName: EventName,
        payload: EditorEventMap[EventName]
    ): void {
        this.events.emit(eventName, payload);
    }

    /**
     * Registers a listener that is called whenever
     * the editor content changes.
     *
     * Listeners are triggered for:
     *
     * - user input changes
     * - programmatic value updates via setValue()
     *
     * Returns an unsubscribe function that removes
     * the listener.
     *
     * @param listener - Change listener callback.
     *
     * @returns Function used to unsubscribe the listener.
     */
    public onChange(listener: (value: string) => void): () => void {
        this.changeListeners.add(listener);

        return () => {
            this.changeListeners.delete(listener);
        };
    }

    /**
     * Sets the editor value and synchronizes all layers.
     */
    public setValue(value: string): void {
        this.events.emit('content:before-change', {
            value,
            source: 'programmatic',
        });

        this.document.setRawContent(value);
        this.input.setValue(value);
        this.textareaBridge?.setValue(value);

        const html = this.markdown.toHtml(value);

        this.output.render(html);

        this.notifyChange(value);

        this.events.emit('content:change', {
            value,
            html,
            source: 'programmatic',
        });
    }

    /**
     * Returns the current editor raw value.
     */
    public getValue(): string {
        return this.document.getRawContent();
    }

    /**
     * Executes a registered command and synchronizes editor state.
     */
    public executeCommand(name: string): void {
        if (!this.commands.has(name)) {
            return;
        }

        this.events.emit('command:before-execute', {
            name,
        });

        this.commands.execute(name);
        this.syncFromInput();

        this.events.emit('command:execute', {
            name,
        });
    }

    /**
     * Focuses the editor input.
     */
    public focus(): void {
        this.input.focus();
    }

    /**
     *  Handles input changes by synchronizing the document and preview.
     */
    private handleInputChange(value: string): void {
        this.events.emit('content:before-change', {
            value,
            source: 'input',
        });

        this.document.setRawContent(value);
        this.textareaBridge?.setValue(value);

        const html = this.markdown.toHtml(value);
        this.output.render(html);

        this.notifyChange(value);

        this.events.emit('content:change', {
            value,
            html,
            source: 'input',
        });
    }

    /**
     * Synchronizes document and preview from the current input value.
     */
    private syncFromInput(): void {
        const value = this.input.getValue();

        this.document.setRawContent(value);
        this.textareaBridge?.setValue(value);

        const html = this.markdown.toHtml(value);

        this.output.render(html);

        this.notifyChange(value);

        this.events.emit('content:change', {
            value,
            html,
            source: 'command',
        });
    }

    /**
     * Creates the current command execution context.
     */
    private createCommandContext(): EditorCommandContext {
        return {
            input: this.input,
            state: this.input.getState()
        };
    }

    /**
     * Creates the API exposed to plugins.
     */
    private createPluginApi(): EditorPluginApi {
        return {
            commands: this.commands,
            slots: this.slots,
            classes: this.classes,
            events: this.events,
            executeCommand: (name: string): void => {
                this.executeCommand(name);
            }
        }
    }

    /**
     * Notifies all registered change listeners
     * with the latest editor value.
     *
     * @param value - Current editor raw content.
     */
    private notifyChange(value: string): void {
        this.changeListeners.forEach((listener) => {
            listener(value);
        });
    }
}