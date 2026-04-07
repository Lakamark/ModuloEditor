import type {EditorDocument} from "./EditorDocument";
import type {EditorInputAdapter} from "../input/EditorInputAdapter";
import type {EditorOutputAdapter} from "../output/EditorOutputAdapter";
import type {TextareaBridge} from "../textarea/TextareaBridge";
import type {EditorDomSlots} from "../dom/EditorDomSlots";
import type {MarkdownProcessor} from "../markdown/MarkdownProcessor";
import type {ModuloEditorOptions} from "./ModuloEditorOptions";
import type {EditorPlugin} from "../plugins/EditorPlugin";
import type {EditorPluginApi} from "../plugins/EditorPluginApi";
import type {EditorCommandContext} from "../commands/EditorCommandContext";

import {EditorCommandRegistry} from "../commands/EditorCommandRegistry";
import {RegistryEditorCommandsApi} from "../commands/RegistryEditorCommandsApi";
import {setupEditorCommands} from "../commands/setupEditorCommands";
import {BoldToolbarPlugin} from "../plugins/BoldToolbarPlugin";

/**
 * Main ModuloEditor class.
 *
 * This class orchestrates:
 * - document
 * - input adapter
 * - output adapter
 * - textarea bridge
 * - command registry
 * - plugins
 */
export class ModuloEditor {
    private unsubscribeInputChange: (() => void) | null = null;
    private readonly document: EditorDocument;
    private readonly input: EditorInputAdapter;
    private readonly output: EditorOutputAdapter;
    private readonly textareaBridge: TextareaBridge;
    private readonly processor: MarkdownProcessor;
    private readonly commandRegistry: EditorCommandRegistry;
    private readonly plugins: readonly EditorPlugin[];
    private runtimePlugins: EditorPlugin[] = [];

    public constructor(
        document: EditorDocument,
        input: EditorInputAdapter,
        output: EditorOutputAdapter,
        textareaBridge: TextareaBridge,
        processor: MarkdownProcessor,
        options: ModuloEditorOptions = {}
    ) {
        this.textareaBridge = textareaBridge;
        this.output = output;
        this.input = input;
        this.document = document;
        this.processor = processor;

        this.commandRegistry = new EditorCommandRegistry();
        this.plugins = options.plugins ?? [];

        setupEditorCommands(this.commandRegistry, {
            builtinCommands: options.builtinCommands,
            commands: options.commands
        });
    }

    /**
     * Initializes the editor using resolved DOM slots.
     */
    public init(slots: EditorDomSlots): void {
        this.textareaBridge.mount(slots.textarea);

        const initialValue = this.textareaBridge.getValue();

        this.document.setRawContent(initialValue);

        this.input.mount(slots.input, initialValue);
        this.output.mount(slots.preview);

        const initialHtml = this.processor.toHtml(initialValue);
        this.output.render(initialHtml);

        this.unsubscribeInputChange = this.input.onChange((value) => {
            this.handleInputChange(value);
        });

        const commandsApi = new RegistryEditorCommandsApi(
            this.commandRegistry,
            () => this.createCommandContext()
        );

        const pluginApi: EditorPluginApi = {
            commands: commandsApi
        };

        this.runtimePlugins = [
            ...this.plugins,
            ...this.createToolbarPlugins(slots)
        ];


        for (const plugin of this.runtimePlugins) {
            plugin.setup(pluginApi);
        }
    }

    /**
     * Destroys editor instance.
     */
    public destroy(): void {
        this.unsubscribeInputChange?.();
        this.unsubscribeInputChange = null;

        for (const plugin of this.runtimePlugins) {
            plugin.destroy();
        }

        this.runtimePlugins = [];

        this.input.destroy();
        this.output.destroy();
        this.textareaBridge.destroy();
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

    private handleInputChange(value: string): void {
        const html = this.processor.toHtml(value);
        this.document.setRawContent(value);
        this.textareaBridge.setValue(value);

        this.output.render(html);
    }

    private createToolbarPlugins(slots: EditorDomSlots): EditorPlugin[] {
        if (!slots.toolbar) {
            return [];
        }

        return [
            new BoldToolbarPlugin(slots.toolbar)
        ]
    }
}