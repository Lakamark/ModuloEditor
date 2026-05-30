import type {
    EditorInputAdapter,
    EditorInputState
} from "./contracts";

/**
 * Default textarea-based input adapter.
 *
 * This adapter provides a lightweight editing experience
 * using a native HTMLTextAreaElement.
 *
 * Responsibilities:
 *
 * - manage editor content
 * - track cursor and selection state
 * - notify content changes
 * - support content insertion at the current selection
 */
export class TextareaInputAdapter implements EditorInputAdapter {
    private textarea: HTMLTextAreaElement | null = null;
    private listeners: Array<(value: string) => void> = [];

    /**
     * Creates and mounts the editor textarea.
     *
     * Change events are forwarded to all registered
     * listeners.
     */
    public mount(element: HTMLElement, initialValue: string): void {
        const textarea = document.createElement('textarea');

       this.setTextareaAttributes(textarea, initialValue);

        textarea.addEventListener('input', () => {
            const value = textarea.value;

            this.listeners.forEach((listener) => {
                listener(value);
            });
        });

        element.appendChild(textarea);

        this.textarea = textarea;
    }

    /**
     * Returns the current editor state.
     *
     * The returned state contains the current content
     * and selection information used by commands and
     * content insertion operations.
     */
    public getState(): EditorInputState {
        const element = this.getElement();

        return {
            value: element.value,
            selectionStart: element.selectionStart ?? 0,
            selectionEnd: element.selectionEnd ?? 0
        }
    }

    public setSelection(start: number, end: number): void {
        this.getElement().setSelectionRange(start, end);
    }

    public getValue(): string {
        return this.textarea?.value ?? '';
    }

    public setValue(value: string): void {
        if (!this.textarea) {
            return;
        }

        this.textarea.value = value;
    }

    /**
     * Inserts content at the current cursor position.
     *
     * If text is currently selected, the selection is
     * replaced by the provided content.
     *
     * After insertion, the cursor is moved to the end
     * of the inserted content and change listeners are
     * notified.
     */
    public insertContent(content: string): void {
        const element = this.getElement();

        const start = element.selectionStart ?? element.value.length;
        const end = element.selectionEnd ?? element.value.length;
        const value = element.value;

        const nextValue =
            value.slice(0, start) +
            content +
            value.slice(end);

        const cursor = start + content.length;

        element.value = nextValue;
        element.setSelectionRange(cursor, cursor);
        element.focus();

        this.listeners.forEach((listener) => {
            listener(nextValue);
        });
    }

    public focus(): void {
        this.textarea?.focus();
    }

    public onChange(listener: (value: string) => void): () => void {
        this.listeners.push(listener);

        return () => {
            this.listeners = this.listeners.filter(
                (l) => l !== listener
            );
        };
    }

    public destroy(): void {
        this.textarea?.remove();
        this.textarea = null;
        this.listeners = [];
    }

    private generateId(): string {
        return `mo-editor-${Math.random().toString(36).slice(2)}`;
    }

    /**
     * Applies default attributes to the editor textarea.
     */
    private setTextareaAttributes(
        textarea: HTMLTextAreaElement,
        initialValue: string
    ): void {
        textarea.id = this.generateId();
        textarea.className = 'mo-editor__textarea';
        textarea.value = initialValue;
        textarea.spellcheck = false;
        textarea.ariaLabel = 'Markdown editor';
    }

    /**
     * Returns the mounted textarea element.
     *
     * @throws Error When the adapter has not been mounted.
     */
    private getElement(): HTMLTextAreaElement {
        if (!this.textarea) {
            throw new Error("Textarea input adapter is not mounted.");
        }

        return this.textarea;
    }
}