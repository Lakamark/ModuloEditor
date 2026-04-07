/**
 * Transforms raw Markdown content into safe HTML.
 */
export interface MarkdownProcessor {
    /**
     * Converts markdown into sanitized HTML.
     *
     * @param markdown - Raw markdown content
     */
    toHtml(markdown: string): string;
}