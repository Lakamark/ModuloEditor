import {it, expect, describe, beforeEach} from "vitest";
import {
    FakeEditorInputAdapter,
    FakeEditorOutputAdapter,
    FakeMarkdownProcessor
} from "../../fakes";
import {
    DefaultEditorPreset,
    ModuloEditor, StarterKitPreset
} from "../../../src";

describe("ModuloEditor presets integration", (): void => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('keeps manually configured adapters when presets are applied before and after', (): void => {
        const root = document.createElement('div');

        const input = new FakeEditorInputAdapter();
        const output = new FakeEditorOutputAdapter();
        const markdown = new FakeMarkdownProcessor();

        expect(() => {
            ModuloEditor
                .create(root)
                .usePreset(new DefaultEditorPreset())
                .withInput(input)
                .usePreset(new DefaultEditorPreset())
                .withOutput(output)
                .withMarkdown(markdown)
                .usePreset(new DefaultEditorPreset())
                .build();
        }).not.toThrow();
    });

    it('applies the same preset multiple times safely', (): void => {
        const root = document.createElement('div');

        expect(() => {
            ModuloEditor
                .create(root)
                .usePreset(new DefaultEditorPreset())
                .usePreset(new DefaultEditorPreset())
                .usePreset(new DefaultEditorPreset())
                .build();
        }).not.toThrow();
    });

    it('supports combining multiple presets safely', (): void => {
        const root = document.createElement('div');

        expect(() => {
            ModuloEditor
                .create(root)
                .usePreset(new DefaultEditorPreset())
                .usePreset(new StarterKitPreset())
                .build();
        }).not.toThrow();
    });

    it('renders markdown to preview html', (): void => {
        document.body.innerHTML = `
    <div data-mo-editor>
        <div data-mo-editor-input></div>
        <div data-mo-editor-preview></div>
        <textarea data-mo-editor-textarea></textarea>
    </div>
`;

        const editor = ModuloEditor
            .create('[data-mo-editor]')
            .usePreset(new StarterKitPreset())
            .build();

        editor.init();

        const input = document.querySelector(
            '[data-mo-editor-input] textarea'
        ) as HTMLTextAreaElement;

        input.value = '# Hello';
        input.dispatchEvent(new Event('input', { bubbles: true }));

        const preview = document.querySelector('[data-mo-editor-preview]');

        expect(preview?.innerHTML).toContain('<h1>Hello</h1>');
    });
})