/**
 * Adapter responsible for rendering editor output.
 *
 * The output adapter only displays already processed content.
 * It does not parse or sanitize Markdown by itself.
 */
export interface EditorOutputAdapter {
    /**
     * Mounts the output inside the given container.
     *
     * @param element - Preview container
     */
    mount(element: HTMLElement): void;

    /**
     * Renders processed HTML output.
     *
     * @param html - Safe HTML content
     */
    render(html: string): void;

    /**
     * Cleans up internal references.
     */
    destroy(): void;
}