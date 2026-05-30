import type {EditorStatusState} from "./EditorStatusState";

/**
 * Adapter responsible for rendering editor status information.
 *
 * The status adapter receives editor state updates and can
 * display any information inside the status bar, such as:
 *
 * - word count
 * - character count
 * - reading time
 * - cursor position
 * - custom application metadata
 *
 * Status adapters are optional. If none is provided,
 * the status area remains empty.
 */
export interface EditorStatusAdapter {
    /**
     * Mounts the status adapter into the status slot.
     *
     * Called once during editor initialization.
     */
    mount(element: HTMLElement): void;

    /**
     * Updates the status bar with the latest editor state.
     *
     * Called whenever editor content changes.
     */
    update(state: EditorStatusState): void;

    /**
     * Cleans up any resources used by the adapter.
     *
     * Called when the editor is destroyed.
     */
    destroy?(): void;
}