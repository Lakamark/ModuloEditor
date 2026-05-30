import type {EditorScrollSectionDecorator} from "./contracts";
import {EDITOR_DOM_ATTRIBUTES} from "../dom/constants";

const BLOCK_SELECTOR = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'ul',
    'ol',
    'pre',
    'blockquote',
    'table',
    'img',
    'hr',
].join(',');

export class DefaultEditorScrollSectionDecorator implements EditorScrollSectionDecorator{
    public decorate(html: string): string {
        const container = document.createElement('div');
        container.innerHTML = html;

        const blocks = container.querySelectorAll<HTMLElement>(BLOCK_SELECTOR);

        blocks.forEach((block, index) => {
            block.setAttribute( EDITOR_DOM_ATTRIBUTES.scrollSection, String(index));
        });

        return container.innerHTML;
    }
}