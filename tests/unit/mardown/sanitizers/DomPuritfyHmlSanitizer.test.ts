import {describe, it, expect} from "vitest";
import {DomPurifyHtmlSanitizer} from "../../../../src/markdown/sanitizers/DomPurifyHtmlSanitizer";
import {DEFAULT_HTML_SANITIZER_CONFIG} from "../../../../src";

describe('DomPurifyHtmlSanitizer', () => {
    it('keeps allowed tags', () => {
        const sanitizer = new DomPurifyHtmlSanitizer(
            DEFAULT_HTML_SANITIZER_CONFIG
        );

        const html = sanitizer.sanitize('<p>Hello <strong>world</strong></p>');

        expect(html).toBe('<p>Hello <strong>world</strong></p>');
    });

    it('removes forbidden tags', () => {
        const sanitizer = new DomPurifyHtmlSanitizer(
            DEFAULT_HTML_SANITIZER_CONFIG
        );

        const html = sanitizer.sanitize('<p>Hello</p><script>alert(1)</script>');

        expect(html).toBe('<p>Hello</p>');
    });

    it('removes forbidden attributes', () => {
        const sanitizer = new DomPurifyHtmlSanitizer(
            DEFAULT_HTML_SANITIZER_CONFIG
        );

        const html = sanitizer.sanitize(
            '<a href="/docs" onclick="alert(1)">Docs</a>'
        );

        expect(html).toBe('<a href="/docs">Docs</a>');
    });
});