import {describe, it, expect} from "vitest";
import {HiddenTextareaBridge} from "../../../src";

describe('HiddenTextareaBridge', () => {
    it('returns empty string before mount', () => {
        const bridge = new HiddenTextareaBridge();

        expect(bridge.getValue()).toBe('');
    });

    it('reads textarea value', () => {
        const textarea = document.createElement('textarea');
        textarea.value = 'Hello';

        const bridge = new HiddenTextareaBridge();
        bridge.mount(textarea);

        expect(bridge.getValue()).toBe('Hello');
    });

    it('writes textarea value', () => {
        const textarea = document.createElement('textarea');

        const bridge = new HiddenTextareaBridge();
        bridge.mount(textarea);

        bridge.setValue('Test');

        expect(textarea.value).toBe('Test');
    });

    it('clears reference on destroy', () => {
        const textarea = document.createElement('textarea');

        const bridge = new HiddenTextareaBridge();
        bridge.mount(textarea);
        bridge.destroy();

        bridge.setValue('Test');

        expect(textarea.value).toBe('');
    });
});