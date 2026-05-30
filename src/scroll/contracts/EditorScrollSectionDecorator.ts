/**
 * Decorates rendered HTML with scroll synchronization metadata.
 *
 * Implementations may inject attributes, anchors, or other markers
 * used by {@link EditorScrollSync} to align scroll positions between
 * the editor input and preview.
 *
 * Decorations are applied only to the rendered preview and must not
 * modify the original Markdown content.
 */
export interface EditorScrollSectionDecorator {
    /**
     * Decorates rendered HTML with scroll section metadata.
     *
     * @param html Rendered HTML produced by a Markdown processor.
     *
     * @returns Decorated HTML containing scroll section markers.
     */
    decorate(html: string): string;
}