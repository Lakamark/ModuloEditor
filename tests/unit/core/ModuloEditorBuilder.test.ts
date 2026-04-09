import {beforeEach, describe, expect, it} from "vitest";
import {ModuloEditor} from "../../../src";
import {BoldToolbarPlugin} from "../../../src/plugins";
import {FakeEditorPreset} from "../../fakes";
import {DefaultModuloEditorBuilder} from "../../../src/core/Builder";

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

    it('should appy the preset', () => {
        const preset = new FakeEditorPreset();
        const builder = new DefaultModuloEditorBuilder('test');

        expect(preset.applied).toBe(false);

        builder.usePreset(preset);

        expect(preset.applied).toBe(true);

    });

    it('should return builder for chaining', () => {
        const preset = new FakeEditorPreset();
        const builder = new DefaultModuloEditorBuilder('test');

        const result = builder.usePreset(preset);

        expect(result).toBe(builder);
    });

    it('should allow multiple presets', () => {
        const presetA = new FakeEditorPreset();
        const presetB = new FakeEditorPreset();

        const builder = new DefaultModuloEditorBuilder('test');

        builder
            .usePreset(presetA)
            .usePreset(presetB);

        expect(presetA.applied).toBe(true);
        expect(presetB.applied).toBe(true);
    });
});