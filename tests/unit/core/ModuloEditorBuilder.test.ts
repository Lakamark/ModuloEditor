import {beforeEach, describe, expect, it} from "vitest";
import {ModuloEditor} from "../../../src";
import {BoldToolbarPlugin} from "../../../src/plugins";

describe('ModuloEditor.create', () => {
    beforeEach(() => {
        document.body.innerHTML = `
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

                <label for="editor-content" class="sr-only">Content</label>
                <textarea
                    hidden
                    name="content"
                    id="editor-content"
                    data-mo-editor-textarea
                ># Hello ModuloEditor</textarea>
            </div>
        `;
    });

    it('creates and initializes the editor with default UI', () => {
        const editor = ModuloEditor
            .create('[data-mo-editor]')
            .init();

        expect(editor).toBeInstanceOf(ModuloEditor);

        const toolbar = document.querySelector('[data-mo-editor-toolbar]');
        const editorTextarea = document.querySelector('.mo-editor__textarea');

        expect(toolbar).not.toBeNull();
        expect(editorTextarea).not.toBeNull();
    });

    it('uses custom plugins', () => {
        ModuloEditor
            .create('[data-mo-editor]')
            .use(new BoldToolbarPlugin())
            .init();

        const toolbar = document.querySelector('[data-mo-editor-toolbar]');

        expect(toolbar?.querySelectorAll('button')).toHaveLength(1);
    });

    it('initializes without plugins', () => {
        ModuloEditor
            .create('[data-mo-editor]')
            .withoutPlugins()
            .init();

        const toolbar = document.querySelector('[data-mo-editor-toolbar]');

        expect(toolbar?.querySelectorAll('button')).toHaveLength(0);
    });

    it('uses custom plugins', () => {
        ModuloEditor
            .create('[data-mo-editor]')
            .use(new BoldToolbarPlugin())
            .init();

        const toolbar = document.querySelector('[data-mo-editor-toolbar]');

        expect(toolbar?.querySelectorAll('button')).toHaveLength(1);
    });
});