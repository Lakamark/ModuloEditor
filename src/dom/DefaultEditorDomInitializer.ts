import type {
    EditorDomInitializationResult,
    EditorDomInitializer
} from "./contracts";

/**
 * Default implementation of EditorDomInitializer.
 *
 * This initializer creates the default editor DOM structure from
 * an existing textarea element.
 *
 * The original textarea is preserved for classic form submission,
 * moved inside the generated editor root, marked with the internal
 * textarea data attribute, and hidden from view.
 */
export class DefaultEditorDomInitializer implements EditorDomInitializer {
    /**
     * Creates the default editor DOM structure from a textarea.
     *
     * The textarea is moved into the generated editor root and kept as the
     * backing textarea for form submission.
     *
     * @param textarea The source textarea used to initialize the editor DOM.
     * @returns The initialized editor root and textarea references.
     */
    public initialize(textarea: HTMLTextAreaElement): EditorDomInitializationResult {
        const root = document.createElement("div");
        root.setAttribute("data-mo-editor", "");

        const header = document.createElement("div");
        header.setAttribute("data-mo-editor-header", "");

        const toolbar = document.createElement("div");
        toolbar.setAttribute("data-mo-editor-toolbar", "");
        header.append(toolbar);

        const body = document.createElement("div");
        body.setAttribute("data-mo-editor-body", "");

        const input = document.createElement("div");
        input.setAttribute("data-mo-editor-input", "");

        const preview = document.createElement("div");
        preview.setAttribute("data-mo-editor-preview", "");

        body.append(input, preview);

        const footer = document.createElement("div");
        footer.setAttribute("data-mo-editor-footer", "");

        const status = document.createElement("div");
        status.setAttribute("data-mo-editor-status", "");
        footer.append(status);

        textarea.hidden = true;
        textarea.setAttribute("data-mo-editor-textarea", "");

        const parent = textarea.parentNode;

        if (parent !== null) {
            parent.insertBefore(root, textarea);
        }

        root.append(header, body, footer, textarea);

        return {
            root,
            textarea
        }
    }
}