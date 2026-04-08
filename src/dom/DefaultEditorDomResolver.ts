import type {
    EditorDomResolver,
    EditorDomSlots
} from "./contracts";

/**
 * Default implementation of EditorDomResolver.
 *
 * This resolver expects the following data attributes:
 *
 * Required:
 * - data-mo-editor-input
 * - data-mo-editor-preview
 * - data-mo-editor-textarea
 *
 * Optional:
 * - data-mo-editor-header
 * - data-mo-editor-toolbar
 * - data-mo-editor-body
 * - data-mo-editor-footer
 * - data-mo-editor-status
 *
 * Example structure:
 *
 * <div data-mo-editor>
 *   <div data-mo-editor-header></div>
 *   <div data-mo-editor-toolbar></div>
 *   <div data-mo-editor-input></div>
 *   <div data-mo-editor-preview></div>
 *   <textarea data-mo-editor-textarea></textarea>
 * </div>
 */
export class DefaultEditorDomResolver implements EditorDomResolver {

    /**
     * Resolves DOM slots from the provided root element.
     */
    public resolve(root: HTMLElement): EditorDomSlots {
        const header = this.getDataAttribute(root, 'header');
        const toolbar = this.getDataAttribute(root, 'toolbar');
        const body = this.getDataAttribute(root, 'body');
        const input = this.getDataAttribute(root, 'input');
        const preview = this.getDataAttribute(root, 'preview');
        const footer = this.getDataAttribute(root, 'footer');
        const status = this.getDataAttribute(root, 'status');
        const textarea = this.getDataAttribute<HTMLTextAreaElement>(root, 'textarea');

        if (!input) {
            throw new Error('ModuloEditor: missing [data-mo-editor-input].');
        }

        if (!preview) {
            throw new Error('ModuloEditor: missing [data-mo-editor-preview].');
        }

        if (!textarea) {
            throw new Error('ModuloEditor: missing [data-mo-editor-textarea].');
        }

        return {
            root,
            header: header ?? null,
            toolbar: toolbar ?? null,
            body: body ?? null,
            input,
            preview,
            footer: footer ?? null,
            status: status ?? null,
            textarea
        };
    }

    /**
     * Finds a DOM element using the data-mo-editor-* convention.
     *
     * @param root - Root element
     * @param attributeName - Slot name
     */
    private getDataAttribute<T extends HTMLElement>(
        root: HTMLElement,
        attributeName: string
    ): T | null {
        const prefix = 'data-mo-editor';
        const selector = `[${prefix}-${attributeName}]`;

        return root.querySelector<T>(selector);
    }
}