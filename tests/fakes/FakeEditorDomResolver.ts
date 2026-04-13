import type { EditorDomResolver, EditorDomSlots } from "../../src";

export class FakeEditorDomResolver implements EditorDomResolver {
    private readonly slots?: EditorDomSlots;

    public constructor(
        slots?: EditorDomSlots
    ) {
        this.slots = slots;
    }

    public resolve(root: HTMLElement): EditorDomSlots {
        if (this.slots) {
            return this.slots;
        }

        return {
            root,
            header: null,
            toolbar: null,
            body: null,
            input: document.createElement("div"),
            preview: document.createElement("div"),
            footer: null,
            status: null,
            textarea: document.createElement("textarea"),
        };
    }
}