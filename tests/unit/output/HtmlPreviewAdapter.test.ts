import {describe, it, expect} from "vitest";
import {HtmlPreviewAdapter} from "../../../src";

describe('HtmlPreviewAdapter', () => {
    it('renders html inside the mounted element', () => {
        const container = document.createElement('div');
        const adapter = new HtmlPreviewAdapter();

        adapter.mount(container);
        adapter.render('<p>Hello</p>');

        expect(container.innerHTML).toBe('<p>Hello</p>');
    });

    it('does nothing when render is called before mount', () => {
        const adapter = new HtmlPreviewAdapter();

        expect(() => adapter.render('<p>Hello</p>')).not.toThrow();
    });

    it('clears preview content on destroy', () => {
        const container = document.createElement('div');
        const adapter = new HtmlPreviewAdapter();

        adapter.mount(container);
        adapter.render('<p>Hello</p>');
        adapter.destroy();

        expect(container.innerHTML).toBe('');
    });
});