import type {EditorInputState} from "./EditorInputState";

/**
 * Contract describing editable input behavior required by commands.
 */
export interface EditorInput {
    getValue(): string;
    setValue(value: string): void;
    getState(): EditorInputState;
    focus(): void;
    setSelection(start: number, end: number): void;
    onChange(listener: (value: string) => void): () => void;
    destroy(): void;
}