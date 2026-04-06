import type {HtmlSanitizerConfig} from "./HtmlSanitizerConfig";

/**
 * Default strict sanitizer configuration.
 */
export const DEFAULT_SANITIZER_CONFIG: HtmlSanitizerConfig = {
    allowedTags: [
        'p',
        'strong',
        'em',
        'code',
        'pre',
        'ul',
        'ol',
        'li',
        'blockquote',
        'a'
    ],
    allowedAttributes: {
        a: ['href', 'title']
    }
}