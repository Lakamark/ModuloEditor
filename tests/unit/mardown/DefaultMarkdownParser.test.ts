import {describe, it, expect} from "vitest";
import {
    DefaultMarkdownProcessor,
    type HtmlSanitizer,
    type MarkdownParser,
    ModuloEditorCore,
    StarterKitPreset
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

    it('renders markdown to preview html', (): void => {
        document.body.innerHTML = `
        <div data-mo-editor>
            <div data-mo-editor-input></div>
            <div data-mo-editor-preview></div>
            <div data-mo-editor-footer>
                <div data-mo-editor-status></div>
            </div>
            <textarea data-mo-editor-textarea></textarea>
        </div>
    `;

        const editor = ModuloEditorCore
            .create('[data-mo-editor]')
            .usePreset(new StarterKitPreset())
            .build();

        editor.init();

        const input = document.querySelector(
            '[data-mo-editor-input] textarea'
        ) as HTMLTextAreaElement;

        input.value = '# Hello';
        input.dispatchEvent(new Event('input', { bubbles: true }));

        const preview = document.querySelector('[data-mo-editor-preview]');

        const heading = preview?.querySelector('h1');

        expect(heading?.textContent).toBe('Hello');
        expect(heading?.getAttribute('data-mo-scroll-section')).toBe('0');
    });
});