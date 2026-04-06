import {describe, it, expect} from "vitest";
import {
    ConfigurableHtmlSanitizer,
    type HtmlSanitizerConfig
} from "../../../../src";
describe('ConfigurableHtmlSanitizer', () => {
    it('returns html as-is for now', () => {
        const sanitizer = new ConfigurableHtmlSanitizer({});

        expect(sanitizer.sanitize('<p>Hello</p>')).toBe('<p>Hello</p>');
    });

    it('stores the provided configuration', () => {
        const config: HtmlSanitizerConfig = {
            allowedTags: ['p', 'a'],
            allowedAttributes: {
                a: ['href']
            }
        };

        const sanitizer = new ConfigurableHtmlSanitizer(config);

        expect(sanitizer.getConfig()).toBe(config);
    });
});