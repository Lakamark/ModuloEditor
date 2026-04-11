import type {EditorDomInitializationResult, EditorDomInitializer} from "../../src/dom/contracts";

export class FakeEditorDomInitializer implements EditorDomInitializer {
    public called: boolean = false;
    public receivedTextarea!: HTMLTextAreaElement;

    public initialize(textarea: HTMLTextAreaElement): EditorDomInitializationResult {
        const root = document.createElement('div');

        this.called = true;
        this.receivedTextarea = textarea;

        return {
            root,
            textarea
        }
    }
}