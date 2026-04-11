import { describe, expect, it } from 'vitest';
import { createEditorTestBed } from './helpers/createEditorTestBed';

describe('ModuloEditor integration: destroy', () => {
    it('destroys all plugins', () => {
        const { editor, plugin } = createEditorTestBed();

        editor.init();
        editor.destroy();

        expect(plugin.destroyCalled).toBe(true);
    });

    it('destroys the textarea bridge', () => {
        const { editor, textareaBridge } = createEditorTestBed();

        editor.init();
        editor.destroy();

        expect(textareaBridge.mountedTextarea).toBeNull();
    });

    it('destroys input and output adapters', () => {
        const { editor, input, output } = createEditorTestBed();

        editor.init();
        editor.destroy();

        expect(input.mounted).toBe(false);
        expect(input.mountedElement).toBeNull();
        expect(output.destroyed).toBe(true);
        expect(output.mountedElement).toBeUndefined();
    });

    it('does nothing when destroy is called before init', () => {
        const { editor, plugin, input, output, textareaBridge } = createEditorTestBed();

        editor.destroy();

        expect(plugin.destroyCalled).toBe(false);
        expect(input.mounted).toBe(false);
        expect(input.mountedElement).toBeNull();
        expect(output.destroyed).toBe(false);
        expect(output.mountedElement).toBeUndefined();
        expect(textareaBridge.mountedTextarea).toBeNull();
    });

    it('can be initialized again after destroy', () => {
        const { editor, input, output, textareaBridge, plugin } = createEditorTestBed();

        editor.init();
        editor.destroy();
        editor.init();

        expect(plugin.destroyCalled).toBe(true);
        expect(plugin.setupCalls).toBe(2);
        expect(input.mounted).toBe(true);
        expect(input.mountedElement).toBeInstanceOf(HTMLElement);
        expect(output.mountedElement).toBeInstanceOf(HTMLElement);
        expect(textareaBridge.mountedTextarea).toBeInstanceOf(HTMLTextAreaElement);
    });
});