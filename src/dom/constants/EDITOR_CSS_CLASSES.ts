import type {EditorCssClassMap} from "../contracts";

/**
 * Default CSS classes applied by the default DOM initializer.
 *
 * These classes are optional and can be overridden safely.
 */
export const EDITOR_CSS_CLASSES: Required<EditorCssClassMap> = {
    root: "mo-editor",
    header: "mo-editor__header",
    toolbar: "mo-editor__toolbar",
    body: "mo-editor__body",
    input: "mo-editor__input",
    preview: "mo-editor__preview",
    footer: "mo-editor__footer",
    status: "mo-editor__status",
    textarea: "mo-editor__textarea",
}