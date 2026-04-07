import {describe, it, expect, vi} from "vitest";
import {TextareaInputAdapter} from "../../../src/input";

describe('TextareaInputAdapter', () => {
    it('mounts textarea', () => {
        const container = document.createElement('div');

        const adapter = new TextareaInputAdapter();
        adapter.mount(container, 'hello');

        const textarea = container.querySelector('textarea');

        expect(textarea).not.toBeNull();
        expect(textarea?.value).toBe('hello');
    });

    it('setValue updates textarea', () => {
        const container = document.createElement('div');

        const adapter = new TextareaInputAdapter();
        adapter.mount(container, '');

        adapter.setValue('test');

        expect(adapter.getValue()).toBe('test');
    });

    it('emits change event', () => {
        const container = document.createElement('div');

        const adapter = new TextareaInputAdapter();
        adapter.mount(container, '');

        const spy = vi.fn();

        adapter.onChange(spy);

        const textarea = container.querySelector('textarea')!;
        textarea.value = 'hello';
        textarea.dispatchEvent(new Event('input'));

        expect(spy).toHaveBeenCalledWith('hello');
    });

    it('destroy removes textarea', () => {
        const container = document.createElement('div');

        const adapter = new TextareaInputAdapter();
        adapter.mount(container, '');

        adapter.destroy();

        expect(container.querySelector('textarea')).toBeNull();
    });
});