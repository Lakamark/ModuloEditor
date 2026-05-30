/**
 * Represents a logical section extracted from editor content.
 *
 * Sections are used to map raw Markdown content to rendered preview
 * regions in order to support advanced features such as scroll
 * synchronization.
 */
export interface EditorScrollSection {
    /**
     * Unique section index.
     */
    readonly index: number;

    /**
     * First line belonging to the section.
     */
    readonly startLine: number;

    /**
     * Last line belonging to the section.
     */
    readonly endLine: number;

    /**
     * CSS selector used to locate the corresponding preview element.
     */
    readonly selector: string;
}