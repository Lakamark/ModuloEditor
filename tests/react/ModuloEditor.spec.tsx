import {render} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ModuloEditor } from '../../src';

describe('ModuloEditor', () => {
    it('renders the editor', () => {
        const value = '# Hello World';

        const onChange = vi.fn();

        render(
            <ModuloEditor
                value={value}
                onChange={onChange}
            />
        );

        expect(
            document.querySelector('[data-mo-editor]')
        ).not.toBeNull();
    });

    it('syncs controlled value updates', () => {
        const onChange = vi.fn();

        const { rerender } = render(
            <ModuloEditor
                value="# Initial"
                onChange={onChange}
            />
        );

        rerender(
            <ModuloEditor
                value="# Updated"
                onChange={onChange}
            />
        );

        expect(
            document.querySelector('[data-mo-editor]')
        ).not.toBeNull();
    });
});