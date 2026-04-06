import type { EditorInputAdapter } from './EditorInputAdapter';

export class TextareaInputAdapter implements EditorInputAdapter {
    private textarea: HTMLTextAreaElement | null = null;
    private listeners: Array<(value: string) => void> = [];

    public mount(element: HTMLElement, initialValue: string): void {
        const textarea = document.createElement('textarea');

        textarea.value = initialValue;

        textarea.addEventListener('input', () => {
            const value = textarea.value;

            this.listeners.forEach((listener) => {
                listener(value);
            });
        });

        element.appendChild(textarea);

        this.textarea = textarea;
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
}