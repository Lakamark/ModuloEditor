import type {EditorInput} from "../../commands";

/**
 * Adapter responsible for handling editor input.
 *
 * This abstraction allows different input implementations
 * such as:
 *
 * - textarea
 * - contenteditable
 * - CodeMirror
 * - Monaco
 */
export interface EditorInputAdapter extends EditorInput {
    /**
     * Mounts the input inside the given container.
     *
     * @param element - Input container
     * @param initialValue - Initial content
     */
    mount(element: HTMLElement, initialValue: string): void;
}