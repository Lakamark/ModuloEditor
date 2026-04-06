import type {HtmlSanitizer} from "../HtmlSanitizer";
import type {HtmlSanitizerConfig} from "./HtmlSanitizerConfig";

/**
 * Configurable HTML sanitizer.
 *
 * This implementation is intentionally minimal and acts as a
 * placeholder until a robust sanitizer (DOMPurify / insane) is plugged in.
 */
export class ConfigurableHtmlSanitizer implements HtmlSanitizer {

    public constructor(_config: HtmlSanitizerConfig) {
    }

    public sanitize(html: string): string {
        // Temporary passthrough
        // real implementation will plug DOMPurify
        return html;
    }
}