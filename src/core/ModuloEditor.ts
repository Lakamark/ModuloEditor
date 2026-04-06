import type {EditorDocument} from "./EditorDocument";
import type {EditorInputAdapter} from "../input/EditorInputAdapter";
import type {EditorOutputAdapter} from "../output/EditorOutputAdapter";
import type {TextareaBridge} from "../textarea/TextareaBridge";
import type {EditorDomSlots} from "../dom/EditorDomSlots";

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

    public constructor(
        document: EditorDocument,
        input: EditorInputAdapter,
        output: EditorOutputAdapter,
        textareaBridge: TextareaBridge
    ) {
        this.textareaBridge = textareaBridge;
        this.output = output;
        this.input = input;
        this.document = document;
    }

    /**
     * Initializes the editor using resolved DOM slots.
     */
    public init(slots: EditorDomSlots): void {
        const initialValue = this.textareaBridge.getValue();

        this.textareaBridge.mount(slots.textarea);

        // Set the inialValue in the EditorDocument (core)
        this.document.setRawContent(initialValue);

        // Mount the input editor
        this.input.mount(slots.input, initialValue);

        // Mount the preview editor
        this.output.mount(slots.preview);
        this.output.render(initialValue);

        // Connect a listener to watch changes.
        this.unsubscribeInputChange = this.input.onChange((value: string): void => {
            this.handleInputChange(value)
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
        this.document.setRawContent(value);
        this.textareaBridge.setValue(value);
        this.output.render(value);
    }
}