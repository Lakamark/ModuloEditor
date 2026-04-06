/**
 * Represents the editor document state.
 *
 * This is the single source of truth for the editor content.
 */
export interface EditorDocument {
    /**
     * Return the raw Markdown content.
     */
    getRawContent(): string;

    /**
     * Updates the raw Markdown content.
     */
    setRawContent(content: string): void;
}