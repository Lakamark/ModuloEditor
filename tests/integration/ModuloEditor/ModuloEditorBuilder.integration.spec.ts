import {beforeEach, describe, expect, it} from "vitest";
import {DefaultEditorPreset, ModuloEditorCore} from "../../../src";
import {
    FakeEditorDomResolver,
    FakeEditorInput, FakeEditorInputAdapter,
    FakeEditorOutputAdapter,
    FakeMarkdownProcessor,
    FakeTextareaBridge
} from "../../fakes";
import { createEditorDomFixture } from "./helpers/createEditorDomFixture";
import {ModuloEditor} from "../../../src/core";

describe('ModuloEditorBuilder integration', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    })

    it('builds and initializes a working editor instance without an explicit document', () => {
        const root = createEditorDomFixture();

        const input = new FakeEditorInput();
        const output = new FakeEditorOutputAdapter();
        const markdown = new FakeMarkdownProcessor();
        const textareaBridge = new FakeTextareaBridge();

        const editor = ModuloEditorCore
            .create(root)
            .withInput(input)
            .withOutput(output)
            .withMarkdown(markdown)
            .withTextareaBridge(textareaBridge)
            .build();

        editor.init();

        expect(input.mounted).toBe(true);
        expect(input.value).toBe('');
        expect(output.mountedElement).toBeInstanceOf(HTMLElement);
        expect(textareaBridge.mountedTextarea).toBeInstanceOf(HTMLTextAreaElement);
    });

    it('throws when building without an input adapter', () => {
        const root = createEditorDomFixture();

        expect(() => {
            ModuloEditor
                .create(root)
                .withOutput(new FakeEditorOutputAdapter())
                .withMarkdown(new FakeMarkdownProcessor())
                .build();
        }).toThrow('ModuloEditor is not fully configured: missing input adapter. Use .usePreset(new DefaultEditorPreset()) or configure the editor manually with .withInput().');
    });

    it('throws when building without an output adapter', () => {
        const root = createEditorDomFixture();

        expect(() => {
            ModuloEditor
                .create(root)
                .withInput(new FakeEditorInput())
                .withMarkdown(new FakeMarkdownProcessor())
                .build();
        }).toThrow('ModuloEditor is not fully configured: missing output adapter. Use .usePreset(new DefaultEditorPreset()) or configure the editor manually with .withOutput().');
    });

    it("uses a default markdown processor when no markdown processor is configured", () => {
        const root = createEditorDomFixture();

        expect(() => {
            ModuloEditor
                .create(root)
                .withInput(new FakeEditorInput())
                .withOutput(new FakeEditorOutputAdapter())
                .build();
        }).not.toThrow();
    });

    it('builds regardless of required method call order', () => {
        const root = createEditorDomFixture();

        const editor = ModuloEditorCore
            .create(root)
            .withMarkdown(new FakeMarkdownProcessor())
            .withOutput(new FakeEditorOutputAdapter())
            .withInput(new FakeEditorInput())
            .build();

        expect(editor).toBeDefined();
    });

    it('throws when the root selector cannot be resolved', () => {
        expect(() => {
            ModuloEditorCore
                .create('[data-missing-editor]')
                .withInput(new FakeEditorInput())
                .withOutput(new FakeEditorOutputAdapter())
                .withMarkdown(new FakeMarkdownProcessor())
                .build();
        }).toThrow('ModuloEditor could not resolve a root element from selector "[data-missing-editor]".');
    });

    it("should create editor using builder", () => {
        const root = document.createElement("div");

        const editor = ModuloEditorCore
            .create(root)
            .withDomResolver(new FakeEditorDomResolver())
            .withInput(new FakeEditorInputAdapter())
            .withOutput(new FakeEditorOutputAdapter())
            .withMarkdown(new FakeMarkdownProcessor())
            .build();

        expect(editor).toBeInstanceOf(ModuloEditorCore);
    });

    it('builds with the default preset', () => {
        document.body.innerHTML = `
        <div data-mo-editor>
            <div data-mo-editor-input></div>
            <div data-mo-editor-preview></div>
            <textarea data-mo-editor-textarea></textarea>
        </div>
    `;

        expect(() => {
            ModuloEditor.create('[data-mo-editor]')
                .usePreset(new DefaultEditorPreset())
                .build();
        }).not.toThrow();
    });
});