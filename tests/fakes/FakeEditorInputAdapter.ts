import type {EditorInputAdapter, EditorInputState} from "../../src/input";

export class FakeEditorInputAdapter implements EditorInputAdapter {
    private value = "";
    private changeListener?: (value: string) => void;
    public mountedElement?: HTMLElement;

    public focused = false;
    public selectionStart = 0;
    public selectionEnd = 0;
    public destroyed = false;

    public mount(element: HTMLElement, initialValue: string): void {
        this.mountedElement = element;
        this.value = initialValue;
    }

    public getValue(): string {
        return this.value;
    }

    public setValue(value: string): void {
        this.value = value;
    }

    public getState(): EditorInputState {
        return {
            value: this.value,
            selectionStart: this.selectionStart,
            selectionEnd: this.selectionEnd,
        };
    }

    public setSelection(start: number, end: number): void {
        this.selectionStart = start;
        this.selectionEnd = end;
    }

    public focus(): void {
        this.focused = true;
    }

    public onChange(listener: (value: string) => void): () => void {
        this.changeListener = listener;

        return () => {
            this.changeListener = undefined;
        };
    }

    public emitChange(value: string): void {
        this.value = value;
        this.changeListener?.(value);
    }

    public destroy(): void {
        this.destroyed = true;
        this.changeListener = undefined;
        this.mountedElement = undefined;
    }
}