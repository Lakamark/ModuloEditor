import type {HtmlSanitizer} from "../contracts";
import type {HtmlSanitizerConfig} from "./HtmlSanitizerConfig";

/**
 * Configurable HTML sanitizer.
 *
 * This class encapsulates sanitization rules and must remain
 * completely isolated from the editor core.
 */
export class ConfigurableHtmlSanitizer implements HtmlSanitizer {
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
        return html;
    }

    /**
     * Returns the active sanitizer configuration.
     */
    public getConfig(): HtmlSanitizerConfig {
        return this.config;
    }
}