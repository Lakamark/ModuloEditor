import { describe, expect, it } from "vitest";
import { ModuloEditor } from "../../../src";
import {
    FakeEditorDomResolver,
    FakeEditorInput, FakeEditorInputAdapter,
    FakeEditorOutputAdapter,
    FakeMarkdownProcessor,
    FakeTextareaBridge
} from "../../fakes";
import { createEditorDomFixture } from "./helpers/createEditorDomFixture";

describe('ModuloEditorBuilder integration', () => {
    it('builds and initializes a working editor instance without an explicit document', () => {
        const root = createEditorDomFixture();

        const input = new FakeEditorInput();
        const output = new FakeEditorOutputAdapter();
        const markdown = new FakeMarkdownProcessor();
        const textareaBridge = new FakeTextareaBridge();

        const editor = ModuloEditor
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
        }).toThrow('ModuloEditorBuilder requires an input adapter.');
    });

    it('throws when building without an output adapter', () => {
        const root = createEditorDomFixture();

        expect(() => {
            ModuloEditor
                .create(root)
                .withInput(new FakeEditorInput())
                .withMarkdown(new FakeMarkdownProcessor())
                .build();
        }).toThrow('ModuloEditorBuilder requires an output adapter.');
    });

    it('throws when building without a markdown processor', () => {
        const root = createEditorDomFixture();

        expect(() => {
            ModuloEditor
                .create(root)
                .withInput(new FakeEditorInput())
                .withOutput(new FakeEditorOutputAdapter())
                .build();
        }).toThrow('ModuloEditorBuilder requires a markdown processor.');
    });

    it('builds regardless of required method call order', () => {
        const root = createEditorDomFixture();

        const editor = ModuloEditor
            .create(root)
            .withMarkdown(new FakeMarkdownProcessor())
            .withOutput(new FakeEditorOutputAdapter())
            .withInput(new FakeEditorInput())
            .build();

        expect(editor).toBeDefined();
    });

    it('throws when the root selector cannot be resolved', () => {
        expect(() => {
            ModuloEditor
                .create('[data-missing-editor]')
                .withInput(new FakeEditorInput())
                .withOutput(new FakeEditorOutputAdapter())
                .withMarkdown(new FakeMarkdownProcessor())
                .build();
        }).toThrow('ModuloEditorBuilder could not resolve root element');
    });

    it("should create editor using builder", () => {
        const root = document.createElement("div");

        const editor = ModuloEditor
            .create(root)
            .withDomResolver(new FakeEditorDomResolver())
            .withInput(new FakeEditorInputAdapter())
            .withOutput(new FakeEditorOutputAdapter())
            .withMarkdown(new FakeMarkdownProcessor())
            .build();

        expect(editor).toBeInstanceOf(ModuloEditor);
    });
});