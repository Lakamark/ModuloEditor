import type {
    EditorDocument,
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
} from "../dom";
import {DefaultEditorDocument} from "./DefaultEditorDocument";
import {setupEditorCommands} from "../commands/setup/setupEditorCommands";
import type {
    EditorDomResolver,
    EditorDomSlots
} from "../dom/contracts";


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

    private unsubscribeInputChange?: () => void;
    private initialized = false;
    private slots!: EditorDomSlots;

    /**
     * Creates a new ModuloEditor instance.
     *
     * Commands and plugins are registered but not initialized
     * until `init()` is called.
     */
    public constructor(
        {
            document = new DefaultEditorDocument(),
            input,
            output,
            markdown,
            commands = [],
            plugins = [],
            builtinCommands = true,
            root,
            domResolver,
            textareaBridge,
        }: ModuloEditorOptions) {
        this.document = document;
        this.input = input;
        this.output = output;
        this.markdown = markdown;
        this.plugins = plugins;
        this.root = root;
        this.domResolver = domResolver ?? new DefaultEditorDomResolver();
        this.textareaBridge = textareaBridge;

        const registry = new EditorCommandRegistry()

        setupEditorCommands(registry, {
            builtinCommands,
            commands
        });

        this.commands = new RegistryEditorCommandsApi(
            registry,
            () => this.createCommandContext()
        );
    }

    /*
    public static create(root: string | HTMLElement): ModuloEditorBuilder  {
        return new DefaultModuloEditorBuilder(root);
    }
     */

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

        this.unsubscribeInputChange?.();
        this.unsubscribeInputChange = undefined;

        for (const plugin of this.plugins) {
            plugin.destroy();
        }

        this.textareaBridge?.destroy();

        this.input.destroy();
        this.output.destroy();

        this.initialized = false;
    }

    /**
     * Sets the editor value and synchronizes all layers.
     */
    public setValue(value: string): void {
        this.document.setRawContent(value);
        this.input.setValue(value);
        this.textareaBridge?.setValue(value);

        this.output.render(this.markdown.toHtml(value));
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

        this.commands.execute(name);
        this.syncFromInput();
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
        this.document.setRawContent(value);
        this.textareaBridge?.setValue(value);
        this.output.render(this.markdown.toHtml(value));
    }

    /**
     * Synchronizes document and preview from the current input value.
     */
    private syncFromInput(): void {
        const value = this.input.getValue();

        this.document.setRawContent(value);
        this.output.render(this.markdown.toHtml(value));
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
            executeCommand: (name: string): void => {
                this.executeCommand(name);
            }
        }
    }
}