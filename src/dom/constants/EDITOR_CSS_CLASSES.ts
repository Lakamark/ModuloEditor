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
    toolbarButton: "mo-editor__toolbar-button",
    body: "mo-editor__body",
    input: "mo-editor__input",
    preview: "mo-editor__preview",
    footer: "mo-editor__footer",
    status: "mo-editor__status",
    textarea: "mo-editor__textarea",

    // Toolbar Dropdown
    toolbarDropdown: 'mo-toolbar-dropdown',
    toolbarDropdownTrigger: 'mo-toolbar-dropdown__trigger',
    toolbarDropdownMenu: 'mo-toolbar-dropdown__menu',
    toolbarDropdownItem: 'mo-toolbar-dropdown__item',
}