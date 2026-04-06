import {describe, expect, it} from "vitest";
import {DefaultEditorDomResolver} from "../../../src";

function createEditorFixture(): HTMLElement {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="mo-editor" data-mo-editor>
            <div class="mo-editor__header" data-mo-editor-header>
                <div class="mo-editor__toolbar" data-mo-editor-toolbar></div>
            </div>

            <div class="mo-editor__body" data-mo-editor-body>
                <div class="mo-editor__input" data-mo-editor-input></div>
                <div class="mo-editor__preview" data-mo-editor-preview></div>
            </div>

            <div class="mo-editor__footer" data-mo-editor-footer>
                <div class="mo-editor__status" data-mo-editor-status></div>
            </div>

            <textarea hidden name="content" data-mo-editor-textarea></textarea>
        </div>
        `;
    const element = root.firstElementChild;

    if (!(element instanceof HTMLElement)) {
        throw new Error('Test fixture root is invalid.');
    }

    return element;
}

function createARootMissingAttribute(name: string): HTMLElement {
    const root = createEditorFixture();
    root.querySelector(name)?.remove();
    return root;
}

describe('DefaultEditorDomResolver', () => {
    it('should resolve the expected editor slots', () => {
        const root = createEditorFixture();
        const resolver = new DefaultEditorDomResolver();
        const slots = resolver.resolve(root);

        const expectations = {
            header: 'data-mo-editor-header',
            toolbar: 'data-mo-editor-toolbar',
            body: 'data-mo-editor-body',
            input: 'data-mo-editor-input',
            preview: 'data-mo-editor-preview',
            footer: 'data-mo-editor-footer',
            status: 'data-mo-editor-status',
            textarea: 'data-mo-editor-textarea'
        } as const;

        Object.entries(expectations).forEach(([slot, attr]) => {
            const element = slots[slot as keyof typeof slots];

            expect(element?.hasAttribute(attr)).toBe(true);
        });
    });

    it('throws when the input slot is missing', () => {
        const root = createARootMissingAttribute('[data-mo-editor-input]');

        const resolver = new DefaultEditorDomResolver();

        expect(() => resolver.resolve(root)).toThrow(
            'ModuloEditor: missing [data-mo-editor-input].'
        );
    });

    it('throws when the preview slot is missing', () => {
        const root = createARootMissingAttribute('[data-mo-editor-preview]');

        const resolver = new DefaultEditorDomResolver();

        expect(() => resolver.resolve(root)).toThrow(
            'ModuloEditor: missing [data-mo-editor-preview].'
        );
    });

    it('throws when the textarea slot is missing', () => {
        const root = createARootMissingAttribute('[data-mo-editor-textarea]');

        const resolver = new DefaultEditorDomResolver();

        expect(() => resolver.resolve(root)).toThrow(
            'ModuloEditor: missing [data-mo-editor-textarea].'
        );
    });

    it('returns null for optional slots when they are not present', () => {
        const root = document.createElement('div');
        root.innerHTML = `
            <div class="mo-editor" data-mo-editor>
                <div data-mo-editor-input></div>
                <div data-mo-editor-preview></div>
                <textarea hidden data-mo-editor-textarea></textarea>
            </div>
        `;

        const element = root.firstElementChild;

        if (!(element instanceof HTMLElement)) {
            throw new Error('Test fixture root is invalid.');
        }

        const resolver = new DefaultEditorDomResolver();
        const slots = resolver.resolve(element);

        expect(slots.header).toBeNull();
        expect(slots.toolbar).toBeNull();
        expect(slots.body).toBeNull();
        expect(slots.footer).toBeNull();
        expect(slots.status).toBeNull();
    });
});