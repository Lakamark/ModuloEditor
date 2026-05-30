import type {EditorInputState} from "../../input";

/**
 * Low-level editable input contract used by ModuloEditor.
 *
 * Implementations are responsible for managing text content,
 * selection state, focus handling, and change notifications.
 *
 * Examples:
 *
 * - TextareaInputAdapter
 * - CodeMirror adapter
 * - Monaco adapter
 */
export interface EditorInput {
    /**
     * Returns the current editor content.
     */
    getValue(): string;

    /**
     * Replaces the entire editor content.
     */
    setValue(value: string): void;


    /**
     * Inserts content at the current selection.
     *
     * If a selection exists, the selected text should be
     * replaced by the provided content.
     */
    insertContent(content: string): void;

    /**
     * Returns the current input state.
     *
     * The state includes content, cursor position,
     * and selection information.
     */
    getState(): EditorInputState;

    /**
     * Focuses the editable input element.
     */
    focus(): void;


    /**
     * Updates the current text selection.
     */
    setSelection(start: number, end: number): void;

    /**
     * Registers a change listener.
     *
     * The listener is called whenever the content changes.
     *
     * Returns an unsubscribe function.
     */
    onChange(listener: (value: string) => void): () => void;

    /**
     * Releases resources and event listeners.
     */
    destroy(): void;
}