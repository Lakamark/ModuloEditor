/**
 * Sanitizes HTML output before it is rendered.
 *
 * This abstraction is responsible for enforcing the allowed tags
 * and attributes policy. It must remain isolated from the editor core.
 */
export interface HtmlSanitizer {
    /**
     * Sanitizes raw HTML content.
     *
     * @param html - Raw HTML string
     */
    sanitize(html: string): string;
}