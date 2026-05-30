import type {EditorScrollSectionDecorator} from "./contracts";
import {EDITOR_DOM_ATTRIBUTES} from "../dom/constants";

/**
 * Default implementation of EditorScrollSectionDecorator.
 *
 * Decorates rendered HTML by adding scroll section attributes
 * to block-level elements. These attributes are later used by
 * EditorScrollSync implementations to align scroll positions
 * between the editor input and preview.
 *
 * Decorations are applied only to the preview HTML and never
 * modify the original Markdown content.
 */

/**
 * Block-level elements eligible for scroll synchronization.
 */
const BLOCK_SELECTOR: string = [
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

export class DefaultEditorScrollSectionDecorator implements EditorScrollSectionDecorator {
    /**
     * Decorates rendered HTML with scroll section metadata.
     *
     * Supported block elements receive a unique
     * `data-mo-scroll-section` attribute that can be used
     * as a synchronization anchor.
     *
     * @param html Rendered HTML produced by a Markdown processor.
     *
     * @returns Decorated HTML containing scroll section markers.
     */
    public decorate(html: string): string {
        const container = document.createElement('div');
        container.innerHTML = html;

        const blocks = container.querySelectorAll<HTMLElement>(BLOCK_SELECTOR);

        blocks.forEach((block, index) => {
            block.setAttribute(EDITOR_DOM_ATTRIBUTES.scrollSection, String(index));
        });

        return container.innerHTML;
    }
}