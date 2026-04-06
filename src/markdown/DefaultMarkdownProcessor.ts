import type {MarkdownProcessor} from "./MarkdownProcessor";
import type {MarkdownParser} from "./MarkdownParser";
import type {HtmlSanitizer} from "./HtmlSanitizer";

/**
 * Default Markdown processor implementation.
 *
 * This class delegates Markdown parsing and HTML sanitization
 * to dedicated abstractions and keeps those concerns outside
 * the editor core.
 */
export class DefaultMarkdownProcessor implements MarkdownProcessor {
    private readonly parser: MarkdownParser;
    private readonly sanitize: HtmlSanitizer;

    public constructor(
        parser: MarkdownParser,
        sanitize: HtmlSanitizer
    ) {
        this.parser = parser;
        this.sanitize = sanitize;
    }

    /**
     * Converts Markdown into safe HTML.
     */
    public toHtml(markdown: string): string {
        const unsafeHTML = this.parser.parse(markdown);

        return this.sanitize.sanitize(unsafeHTML);
    }
}