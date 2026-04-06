import type {EditorInput} from "../../src/commands/EditorInput";
import type {EditorInputState} from "../../src/commands/EditorInputState";

export class FakeEditorInput implements EditorInput {
    public value = '';
    public focused = false;
    public selectionStart = 0;
    public selectionEnd = 0;

    private listeners: ((value: string) => void)[] = [];

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
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    public destroy(): void {
        this.listeners = [];
    }
}