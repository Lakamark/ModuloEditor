import type {EditorDocument} from "./EditorDocument";

/**
 * Default implementation of EditorDocument.
 */
export class DefaultEditorDocument implements EditorDocument {
    private content: string;

    public constructor(content: string = "") {
        this.content = content;
    }

    public getRawContent(): string {
        return this.content;
    }

    public setRawContent(content: string): void {
        this.content = content;
    }
}