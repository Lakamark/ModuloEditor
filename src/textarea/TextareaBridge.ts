/**
 * Synchronizes editor content with a hidden textarea.
 *
 * This allows the editor to integrate with native HTML forms.
 */
export interface TextareaBridge {
    /**
     * Mounts the bridge on a textarea element.
     */
    mount(textarea: HTMLTextAreaElement): void;

    /**
     * Returns textarea value.
     */
    getValue(): string;

    /**
     * Updates textarea value.
     */
    setValue(value: string): void;

    /**
     * Cleans up internal references.
     */
    destroy(): void;
}