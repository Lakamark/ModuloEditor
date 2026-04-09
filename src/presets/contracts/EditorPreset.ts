import type {ModuloEditorBuilder} from "../../core";

export interface EditorPreset {
    readonly name: string

    apply(builder: ModuloEditorBuilder): void;
}