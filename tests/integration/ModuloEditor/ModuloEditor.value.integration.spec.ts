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
        input.setValue('Changed from input');

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
});