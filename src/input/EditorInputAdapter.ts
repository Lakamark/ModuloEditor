/**
 * Adapter responsible for handling editor input.
 *
 * This abstraction allows different input implementations
 * like textarea, contenteditable, or CodeMirror.
 */
export interface EditorInputAdapter {
    /**
     * Mounts the input inside the given container.
     *
     * @param element - Input container
     * @param initialValue - Initial content
     */
    mount(element: HTMLElement, initialValue: string): void;

    /**
     * Returns the current editor value.
     */
    getValue(): string;

    /**
     * Updates the editor content.
     */
    setValue(value: string): void;

    /**
     * Focuses the editor.
     */
    focus(): void;

    /**
     * Registers a change listener.
     *
     * Returns an unsubscribe function.
     */
    onChange(listener: (value: string) => void): () => void;

    /**
     * Cleans up the adapter.
     */
    destroy(): void;
}