import { describe, expect, it } from 'vitest';
import { createEditorTestBed } from './helpers/createEditorTestBed';

describe('ModuloEditor integration: init', () => {
    it('mounts the input with the initial document content', () => {
        const { editor, input, output } = createEditorTestBed({
            content: 'Initial content',
        });

        editor.init();

        expect(input.mounted).toBe(true);
        expect(input.mountedElement).toBeInstanceOf(HTMLElement);
        expect(input.value).toBe('Initial content');
        expect(output.renderedHtml).toBe('<p>Initial content</p>');
    });

    it('mounts the input with the initial document content', () => {
        const { editor, input } = createEditorTestBed({
            content: 'Initial content',
        });

        editor.init();

        expect(input.mounted).toBe(true);
        expect(input.mountedElement).toBeInstanceOf(HTMLElement);
        expect(input.value).toBe('Initial content');
    });

    it('mounts the textarea bridge with the textarea slot', () => {
        const { editor, textareaBridge } = createEditorTestBed();

        editor.init();

        expect(textareaBridge.mountedTextarea).toBeInstanceOf(HTMLTextAreaElement);
    });

    it('syncs the initial content to the textarea bridge on init', () => {
        const { editor, textareaBridge } = createEditorTestBed({
            content: 'Initial content',
        });

        editor.init();

        expect(textareaBridge.getValue()).toBe('Initial content');
    });

    it('renders the initial preview from the document content', () => {
        const { editor, markdown, output } = createEditorTestBed({
            content: 'Initial content',
        });

        editor.init();

        expect(markdown.lastValue).toBe('Initial content');
        expect(output.renderedHtml).toBe('<p>Initial content</p>');
    });

    it('mounts the output with the preview slot', () => {
        const { editor, output } = createEditorTestBed();

        editor.init();

        expect(output.mountedElement).toBeInstanceOf(HTMLElement);
    });

    it('sets up plugins on init', () => {
        const { editor, plugin } = createEditorTestBed();

        editor.init();

        expect(plugin.setupCalled).toBe(true);
    });

    it('does nothing when init is called twice', () => {
        const { editor, plugin, input, output, textareaBridge } = createEditorTestBed();

        editor.init();

        const firstInputElement = input.mountedElement;
        const firstOutputElement = output.mountedElement;
        const firstTextarea = textareaBridge.mountedTextarea;
        const firstRenderedHtml = output.renderedHtml;

        editor.init();

        expect(plugin.setupCalls).toBe(1);
        expect(input.mounted).toBe(true);
        expect(input.mountedElement).toBe(firstInputElement);
        expect(output.mountedElement).toBe(firstOutputElement);
        expect(textareaBridge.mountedTextarea).toBe(firstTextarea);
        expect(output.renderedHtml).toBe(firstRenderedHtml);
    });
});