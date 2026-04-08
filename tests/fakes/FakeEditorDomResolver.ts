import type {
    EditorDomResolver,
    EditorDomSlots
} from "../../src/dom/contracts";

export class FakeEditorDomResolver implements EditorDomResolver {
    private readonly slots: EditorDomSlots;

    public constructor(slots: EditorDomSlots) {
        this.slots = slots;
    }

    public resolve(): EditorDomSlots {
        return this.slots;
    }
}