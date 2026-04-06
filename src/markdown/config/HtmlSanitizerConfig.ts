/**
 * Configuration used by HTML sanitizer implementations.
 */
export interface HtmlSanitizerConfig {
    /**
     * Allowed HTML tags.
     */
    readonly allowedTags?: readonly string[];

    /**
     * Allowed attributes per tag.
     */
    readonly allowedAttributes?: Readonly<
        Record<string, readonly string[]>
    >;
}