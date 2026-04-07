import {describe, expect, it} from "vitest";
import {DefaultEditorDocument} from "../../../src/core";

describe('DefaultEditorDocument', () => {
    it('should return empty string key by default', () => {
        const document = new DefaultEditorDocument('');

        expect(document.getRawContent()).toBe('');
    });

    it('should store the content', () => {
        const document = new DefaultEditorDocument('');

        document.setRawContent('# Hello');

        expect(document.getRawContent()).toBe('# Hello');
    });

    it('should overwrite previous content', () => {
        const document = new DefaultEditorDocument('');

        document.setRawContent('A');
        document.setRawContent('B');

        expect(document.getRawContent()).toBe('B');
    });
});