import {describe, it, expect} from "vitest";
import {
    DefaultMarkdownProcessor,
    type HtmlSanitizer,
    type MarkdownParser
} from "../../../src";


class FakeMarkdownParser implements MarkdownParser {
    public parse(markdown: string): string {
        return `<p>${markdown}</p>`;
    }
}

class FakeHtmlSanitizer implements HtmlSanitizer {
    public sanitize(html: string): string {
        return html.replace('<script>', '').replace('</script>', '');
    }
}

describe('DefaultMarkdownProcessor', () => {
    it('parses markdown before sanitizing html', () => {
        const processor = new DefaultMarkdownProcessor(
            new FakeMarkdownParser(),
            new FakeHtmlSanitizer()
        );

        const html = processor.toHtml('Hello');

        expect(html).toBe('<p>Hello</p>');
    });

    it('sanitizes parser output', () => {
        class UnsafeParser implements MarkdownParser {
            public parse(markdown: string): string {
                return `<p>${markdown}</p><script>alert(1)</script>`;
            }
        }

        const processor = new DefaultMarkdownProcessor(
            new UnsafeParser(),
            new FakeHtmlSanitizer()
        );

        const html = processor.toHtml('Hello');

        expect(html).toBe('<p>Hello</p>alert(1)');
    });
});