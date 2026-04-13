import type {
    EditorDomInitializationResult,
    EditorDomInitializer
} from "../../src/dom/contracts";

export class FakeEditorDomInitializer implements EditorDomInitializer {
    public called = false;
    public receivedTextarea!: HTMLTextAreaElement;
    public calledCount = 0;
    public customResult?: EditorDomInitializationResult;
    public result?: EditorDomInitializationResult;

    public initialize(textarea: HTMLTextAreaElement): EditorDomInitializationResult {
        this.called = true;
        this.receivedTextarea = textarea;
        this.calledCount += 1;

        const result = this.customResult ?? {
            root: document.createElement("div"),
            textarea,
        };

        this.result = result;

        return result;
    }
}