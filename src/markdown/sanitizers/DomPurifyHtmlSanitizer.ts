import DOMPurify from 'dompurify';
import type {HtmlSanitizer} from "../HtmlSanitizer";
import type {HtmlSanitizerConfig} from "../config/HtmlSanitizerConfig";

/**
 * HTML sanitizer implementation backed by DOMPurify.
 *
 * This class is isolated from the editor core and is only responsible
 * for transforming unsafe HTML into safe HTML according to the provided
 * configuration.
 */
export class DomPurifyHtmlSanitizer implements HtmlSanitizer {
    private readonly config: HtmlSanitizerConfig;

    public constructor(config: HtmlSanitizerConfig) {
        this.config = config;
    }

    /**
     * Sanitizes raw HTML output.
     *
     * @param html - Raw HTML string
     */
    public sanitize(html: string): string {
        return DOMPurify.sanitize(html, {
            USE_PROFILES: {html: true},
            ALLOWED_TAGS: this.config.allowedTags
                ? [...this.config.allowedTags]
                : undefined,
            ALLOWED_ATTR: this.flattenAllowedAttributes(this.config)
        });
    }

    /**
     * Flattens per-tag allowed attributes into a DOMPurify-compatible list.
     *
     * DOMPurify's ALLOWED_ATTR is global, so this is a first clean step.
     * If you later want stricter per-tag control, you can move to hooks.
     */
    private flattenAllowedAttributes(
        config: HtmlSanitizerConfig
    ): string[] | undefined {
        if (!config.allowedAttributes) {
            return undefined;
        }

        const attributes = new Set<string>();

        Object.values(config.allowedAttributes).forEach((names) => {
            names.forEach((name) => {
                attributes.add(name);
            })
        });

        return [...attributes];
    }
}