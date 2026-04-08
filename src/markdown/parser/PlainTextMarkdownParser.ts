import type {MarkdownParser} from "../contracts";

/**
 * Temporary Markdown parser used for development.
 *
 * This implementation does not parse real Markdown yet.
 * It simply wraps text inside a paragraph.
 */
export class PlainTextMarkdownParser implements MarkdownParser {
    public parse(markdown: string): string {
        const p = document.createElement("p");
        p.textContent = markdown;
        return p.outerHTML;
    }
}