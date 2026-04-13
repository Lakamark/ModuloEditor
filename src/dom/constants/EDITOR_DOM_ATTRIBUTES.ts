/**
 * Stable DOM attributes used by ModuloEditor to identify editor slots.
 *
 * These attributes form the DOM contract used by the default resolver.
 */
export const EDITOR_DOM_ATTRIBUTES = {
    root: "data-mo-editor",
    header: "data-mo-editor-header",
    toolbar: "data-mo-editor-toolbar",
    body: "data-mo-editor-body",
    input: "data-mo-editor-input",
    preview: "data-mo-editor-preview",
    footer: "data-mo-editor-footer",
    status: "data-mo-editor-status",
    textarea: "data-mo-editor-textarea",
} as const;