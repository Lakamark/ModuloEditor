import type {MarkdownParser} from "./MarkdownParser";

/**
 * Temporary Markdown parser used for development.
 *
 * This implementation does not parse real Markdown yet.
 * It simply wraps text inside a paragraph.
 */
export class PlainTextMarkdownParser implements MarkdownParser {
    public parse(markdown: string): string {
        return `<p>${markdown}</p>`;
    }
}