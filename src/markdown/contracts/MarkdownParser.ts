/**
 * Parses raw Markdown content into HTML.
 */
export interface MarkdownParser {
    /**
     * Converts markdown into HTML.
     *
     * @param markdown - Raw markdown content
     */
    parse(markdown: string): string;
}