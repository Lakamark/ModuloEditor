import {DefaultEditorDocument} from "./DefaultEditorDocument";
import type {ModuloEditorOptions} from "./ModuloEditorOptions";
import type {EditorDocument} from "./EditorDocument";
import type {EditorInputAdapter} from "../input";
import type {EditorOutputAdapter} from "../output";
import type {MarkdownProcessor} from "../markdown";

/**
 * Main editor orchestrator.
 *
 * ModuloEditor coordinates the different editor layers:
 *
 * - EditorDocument: source of truth for raw content
 * - EditorInputAdapter: interactive editing layer
 * - MarkdownProcessor: transforms raw content to HTML
 * - EditorOutputAdapter: renders processed HTML
 *
 * Responsibilities:
 *
 * - Initialize input with document content
 * - Render initial preview
 * - Synchronize document and preview on input change
 * - Expose public editor API (getValue, setValue, focus)
 * - Manage lifecycle (init / destroy)
 */
export class ModuloEditor {
    private document: EditorDocument;
    private input: EditorInputAdapter;
    private output: EditorOutputAdapter;
    private markdown: MarkdownProcessor;
    private unsubscribeInputChange?: () => void;

    /**
     * Creates a new ModuloEditor instance.
     *
     * @param options - Editor configuration options
     */
    public constructor(
        {
            document = new DefaultEditorDocument(),
            input,
            output,
            markdown,
        }: ModuloEditorOptions) {
        this.document = document;
        this.input = input;
        this.output = output;
        this.markdown = markdown;
    }

    /**
     * Initializes the editor and synchronizes all layers.
     *
     * - sets input value from document
     * - renders initial preview
     * - subscribes to input changes
     */
    public init(): void {
        const content = this.document.getRawContent();

        this.input.setValue(content);

        const html = this.markdown.toHtml(content);
        this.output.render(html);

        this.unsubscribeInputChange = this.input.onChange((value: string) => {
            this.document.setRawContent(value);

            const nextHtml = this.markdown.toHtml(value);
            this.output.render(nextHtml);
        });
    }

    /**
     * Destroys the editor and releases all listeners.
     */
    public destroy(): void {
        this.unsubscribeInputChange?.();
        this.unsubscribeInputChange = undefined;

        this.input.destroy();
        this.output.destroy();
    }

    /**
     * Sets the editor value and synchronizes all layers.
     */
    public setValue(value: string): void {
        this.document.setRawContent(value);
        this.input.setValue(value);
        this.output.render(this.markdown.toHtml(value));
    }

    /**
     * Returns the current editor raw value.
     */
    public getValue(): string {
        return this.document.getRawContent();
    }

    /**
     * Focuses the editor input.
     */
    public focus(): void {
        this.input.focus();
    }
}