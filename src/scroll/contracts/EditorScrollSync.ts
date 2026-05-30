/**
 * Synchronizes scroll position between the editor input
 * and the rendered preview.
 */
export interface EditorScrollSync {
    /**
     * Starts listening to scroll events.
     */
    mount(source: HTMLElement, target: HTMLElement): void;

    /**
     * Removes listeners and clears internal state.
     */
    destroy(): void;
}