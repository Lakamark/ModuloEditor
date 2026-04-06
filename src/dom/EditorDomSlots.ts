/**
 * Resolved DOM slots used by the editor.
 *
 * These slots are extracted from the root element using
 * data attributes (data-mo-editor-*).
 *
 * Some slots are optional and may not exist depending on the
 * provided HTML structure.
 *
 * Required slots:
 * - input
 * - preview
 * - textarea
 *
 * Optional slots:
 * - header
 * - toolbar
 * - body
 * - footer
 * - status
 */
export interface EditorDomSlots {
    /**
     * Root editor element.
     */
    readonly root: HTMLElement;

    /**
     * Optional header container.
     */
    readonly header: HTMLElement | null;

    /**
     * Optional toolbar container.
     */
    readonly toolbar: HTMLElement | null;

    /**
     * Optional body container.
     */
    readonly body: HTMLElement | null;

    /**
     * Editor input container.
     * This is where the EditorInputAdapter will mount.
     */
    readonly input: HTMLElement;

    /**
     * Preview container.
     * This is where the EditorOutputAdapter will render HTML.
     */
    readonly preview: HTMLElement;

    /**
     * Optional footer container.
     */
    readonly footer: HTMLElement | null;

    /**
     * Optional status container.
     */
    readonly status: HTMLElement | null;

    /**
     * Hidden textarea used for form submission.
     */
    readonly textarea: HTMLTextAreaElement;
}