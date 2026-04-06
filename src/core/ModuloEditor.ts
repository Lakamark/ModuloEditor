import type {EditorDocument} from "./EditorDocument";
import type {EditorInputAdapter} from "../input/EditorInputAdapter";
import type {EditorOutputAdapter} from "../output/EditorOutputAdapter";
import type {TextareaBridge} from "../textarea/TextareaBridge";
import type {EditorDomSlots} from "../dom/EditorDomSlots";
import type {MarkdownProcessor} from "../markdown/MarkdownProcessor";

/**
 * Main ModuloEditor class.
 *
 * This class orchestrates:
 * - document
 * - input adapter
 * - output adapter
 * - textarea bridge
 */
export class ModuloEditor {
    private unsubscribeInputChange: (() => void) | null = null;
    private readonly document: EditorDocument;
    private readonly input: EditorInputAdapter;
    private readonly output: EditorOutputAdapter;
    private readonly textareaBridge: TextareaBridge;
    private readonly processor: MarkdownProcessor;

    public constructor(
        document: EditorDocument,
        input: EditorInputAdapter,
        output: EditorOutputAdapter,
        textareaBridge: TextareaBridge,
        processor: MarkdownProcessor
    ) {
        this.textareaBridge = textareaBridge;
        this.output = output;
        this.input = input;
        this.document = document;
        this.processor = processor;
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
    }

    /**
     * Destroys editor instance.
     */
    public destroy(): void {
        this.unsubscribeInputChange?.();
        this.unsubscribeInputChange = null;

        this.input.destroy();
        this.output.destroy();
        this.textareaBridge.destroy();
    }

    private handleInputChange(value: string): void {
        const html = this.processor.toHtml(value);
        this.document.setRawContent(value);
        this.textareaBridge.setValue(value);

        this.output.render(html);
    }
}