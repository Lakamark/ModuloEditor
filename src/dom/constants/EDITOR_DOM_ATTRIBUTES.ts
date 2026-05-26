/**
 * Stable DOM attributes used by ModuloEditor to identify editor slots.
 *
 * These attributes form the DOM contract used by the default resolver.
 */
export const EDITOR_DOM_ATTRIBUTES = {
    root: "data-mo-editor",
    header: "data-mo-editor-header",
    toolbar: "data-mo-editor-toolbar",
    toolbarButton: "data-mo-editor-toolbar-button",
    body: "data-mo-editor-body",
    input: "data-mo-editor-input",
    preview: "data-mo-editor-preview",
    footer: "data-mo-editor-footer",
    status: "data-mo-editor-status",
    textarea: "data-mo-editor-textarea",
    toolbarDropdown: 'data-mo-toolbar-dropdown',
    toolbarDropdownTrigger: 'data-mo-toolbar-dropdown-trigger',
    toolbarDropdownMenu: 'data-mo-toolbar-dropdown-menu',
    toolbarDropdownItem: 'data-mo-toolbar-dropdown-item',
} as const;