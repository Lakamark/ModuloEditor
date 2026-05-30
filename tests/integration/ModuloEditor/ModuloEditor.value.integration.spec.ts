import { describe, expect, it } from 'vitest';
import { createEditorTestBed } from './helpers/createEditorTestBed';

describe('ModuloEditor integration: value synchronization', () => {
    it('setValue synchronizes document, input, textarea bridge and preview', () => {
        const { editor, document, input, textareaBridge, markdown, output } = createEditorTestBed({
            content: 'Before',
        });

        editor.init();
        editor.setValue('After');

        expect(document.getRawContent()).toBe('After');
        expect(input.value).toBe('After');
        expect(textareaBridge.getValue()).toBe('After');
        expect(markdown.lastValue).toBe('After');
        expect(output.renderedHtml).toBe('<p>After</p>');
    });

    it('getValue returns the current raw document content', () => {
        const { editor } = createEditorTestBed({
            content: 'Initial content',
        });

        expect(editor.getValue()).toBe('Initial content');
    });

    it('synchronizes document, textarea bridge and preview when input value changes', () => {
        const { editor, document, input, textareaBridge, markdown, output } = createEditorTestBed({
            content: 'Before',
        });

        editor.init();
        input.triggerInput('Changed from input');

        expect(document.getRawContent()).toBe('Changed from input');
        expect(textareaBridge.getValue()).toBe('Changed from input');
        expect(markdown.lastValue).toBe('Changed from input');
        expect(output.renderedHtml).toBe('<p>Changed from input</p>');
    });

    it('setValue updates the editor value returned by getValue', () => {
        const { editor } = createEditorTestBed({
            content: 'Before',
        });

        editor.init();
        editor.setValue('After');

        expect(editor.getValue()).toBe('After');
    });

    it("inserts content through the public editor API", () => {
        const { editor, textareaBridge, markdown, output } = createEditorTestBed({
            content: "Before",
        });

        editor.init();

        const changes: string[] = [];

        editor.on("content:change", ({ value }) => {
            changes.push(value);
        });

        editor.insertContent("\n\n![image](url)");

        const expected = "Before\n\n![image](url)";

        expect(editor.getValue()).toBe(expected);
        expect(textareaBridge.getValue()).toBe(expected);
        expect(markdown.lastValue).toBe(expected);
        expect(changes).toEqual([expected]);
        expect(output.renderedHtml).toBe(`<p>${expected}</p>`);
    });
});