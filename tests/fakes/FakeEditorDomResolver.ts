import type {
    EditorDomResolver,
    EditorDomSlots
} from "../../src/dom/contracts";

export class FakeEditorDomResolver implements EditorDomResolver {
    public resolve(_root: HTMLElement): EditorDomSlots {
        return {} as EditorDomSlots;
    }
}