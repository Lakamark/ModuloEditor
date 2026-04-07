import type {HtmlSanitizer} from "../contracts";

/**
 * Temporary sanitizer used for development.
 *
 * This implementation returns HTML as-is and must not be used
 * as a production-safe sanitizer.
 */
export class NoopHtmlSanitizer implements HtmlSanitizer {
    public sanitize(html: string): string {
        return html;
    }
}