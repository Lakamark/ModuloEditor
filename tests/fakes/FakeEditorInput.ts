import type {
    EditorInputAdapter,
    EditorInputState
} from "../../src";

export class FakeEditorInput implements EditorInputAdapter {
    public value = '';
    public focused = false;
    public selectionStart = 0;
    public selectionEnd = 0;
    public mounted = false;
    public mountedElement: HTMLElement | null = null;

    private listeners: Array<(value: string) => void> = [];

    public mount(element: HTMLElement, initialValue: string): void {
        this.mounted = true;
        this.mountedElement = element;
        this.value = initialValue;
    }

    public setValue(value: string): void {
        this.value = value;

        for (const listener of this.listeners) {
            listener(value);
        }
    }

    public focus(): void {
        this.focused = true;
    }

    public setSelection(start: number, end: number): void {
        this.selectionStart = start;
        this.selectionEnd = end;
    }

    public getValue(): string {
        return this.value;
    }

    public getState(): EditorInputState {
        return {
            value: this.value,
            selectionStart: this.selectionStart,
            selectionEnd: this.selectionEnd,
        };
    }

    public onChange(listener: (value: string) => void): () => void {
        this.listeners.push(listener);

        return () => {
            this.listeners = this.listeners.filter((registered) => registered !== listener);
        };
    }

    public destroy(): void {
        this.listeners = [];
        this.mounted = false;
        this.mountedElement = null;
    }
}