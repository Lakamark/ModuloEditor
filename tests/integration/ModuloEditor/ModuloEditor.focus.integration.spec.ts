import { describe, expect, it } from 'vitest';
import { createEditorTestBed } from './helpers/createEditorTestBed';

describe('ModuloEditor integration: focus', () => {
    it('focuses the input adapter', () => {
        const { editor, input } = createEditorTestBed();

        expect(input.focused).toBe(false);

        editor.focus();

        expect(input.focused).toBe(true);
    });

    it('focus works even before init', () => {
        const { editor, input } = createEditorTestBed();

        editor.focus();

        expect(input.focused).toBe(true);
    });
});