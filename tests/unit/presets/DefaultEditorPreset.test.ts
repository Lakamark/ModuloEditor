import { describe, expect, it } from 'vitest';

import { DefaultEditorPreset } from '../../../src';
import { DefaultModuloEditorBuilder } from '../../../src/core/Builder';

describe('DefaultEditorPreset', (): void => {
    it('applies the default preset without throwing', (): void => {
        const builder = new DefaultModuloEditorBuilder(
            document.createElement('div')
        );

        expect(() => {
            builder.usePreset(new DefaultEditorPreset());
        }).not.toThrow();
    });

    it('builds an editor using the default preset', (): void => {
        document.body.innerHTML = `
        <div data-mo-editor>
            <textarea data-mo-editor-input></textarea>
            <div data-mo-editor-preview></div>
        </div>
    `;

        expect(() => {
            new DefaultModuloEditorBuilder('[data-mo-editor]')
                .usePreset(new DefaultEditorPreset())
                .build();
        }).not.toThrow();
    });
});