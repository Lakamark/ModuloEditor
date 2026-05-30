import type {EditorScrollSectionDecorator} from "../../src";

export class FakeEditorScrollSectionDecorator implements EditorScrollSectionDecorator {
    public decorate(html: string): string {
        return html;
    }
}