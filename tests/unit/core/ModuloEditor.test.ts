import {describe, it, expect} from "vitest";
import {FakeEditorInputAdapter} from "../../fakes/FakeEditorInputAdapter";
import {FakeEditorOutputAdapter} from "../../fakes/FakeEditorOutputAdapter";
import {FakeMarkdownProcessor} from "../../fakes/FakeMarkdownProcessor";
import {DefaultEditorDocument, ModuloEditor} from "../../../src/core";

describe('ModuloEditor', () => {
    it("renders the initial preview on init", () => {
        const document = new DefaultEditorDocument("Hello");

        const input = new FakeEditorInputAdapter();
        const output = new FakeEditorOutputAdapter();
        const markdown = new FakeMarkdownProcessor();

        const editor = new ModuloEditor({
            document,
            input,
            output,
            markdown,
        });

        editor.init();

        expect(output.renderedHtml).toBe("<p>Hello</p>");
    });

    it("updates the document and output when the input value changes", () => {
        const document = new DefaultEditorDocument("Hello");

        const input = new FakeEditorInputAdapter();
        const output = new FakeEditorOutputAdapter();
        const markdown = new FakeMarkdownProcessor();

        const editor = new ModuloEditor({
            document,
            input,
            output,
            markdown,
        });

        editor.init();
        input.emitChange("Updated");

        expect(document.getRawContent()).toBe("Updated");
        expect(output.renderedHtml).toBe("<p>Updated</p>");
    });

    it("sets the value on the document, input and output", () => {
        const document = new DefaultEditorDocument("Hello");

        const input = new FakeEditorInputAdapter();
        const output = new FakeEditorOutputAdapter();
        const markdown = new FakeMarkdownProcessor();

        const editor = new ModuloEditor({
            document,
            input,
            output,
            markdown,
        });

        editor.init();
        editor.setValue("New value");

        expect(document.getRawContent()).toBe("New value");
        expect(input.getValue()).toBe("New value");
        expect(output.renderedHtml).toBe("<p>New value</p>");
    });

    it("returns the current document value", () => {
        const document = new DefaultEditorDocument("Hello");

        const input = new FakeEditorInputAdapter();
        const output = new FakeEditorOutputAdapter();
        const markdown = new FakeMarkdownProcessor();

        const editor = new ModuloEditor({
            document,
            input,
            output,
            markdown,
        });

        expect(editor.getValue()).toBe("Hello");
    });

    it("focuses the input", () => {
        const document = new DefaultEditorDocument("Hello");

        const input = new FakeEditorInputAdapter();
        const output = new FakeEditorOutputAdapter();
        const markdown = new FakeMarkdownProcessor();

        const editor = new ModuloEditor({
            document,
            input,
            output,
            markdown,
        });

        expect(input.focused).toBe(false);

        editor.focus();

        expect(input.focused).toBe(true);
    });

    it("removes the input listener on destroy", () => {
        const document = new DefaultEditorDocument("Hello");

        const input = new FakeEditorInputAdapter();
        const output = new FakeEditorOutputAdapter();
        const markdown = new FakeMarkdownProcessor();

        const editor = new ModuloEditor({
            document,
            input,
            output,
            markdown,
        });

        editor.init();
        editor.destroy();

        input.emitChange("After destroy");

        expect(document.getRawContent()).toBe("Hello");
        expect(output.renderedHtml).toBe("<p>Hello</p>");
    });
});