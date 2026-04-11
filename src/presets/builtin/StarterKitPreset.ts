import type {EditorPreset} from "../contracts";
import type {ModuloEditorBuilder} from "../../core";
import {DefaultEditorPreset} from "./DefaultEditorPreset";
import {SafeMarkdownPreset} from "./SafeMarkdownPreset";

export class StarterKitPreset implements EditorPreset {
    public readonly name = "starter-kit";

    public apply(builder: ModuloEditorBuilder): void {
        new DefaultEditorPreset().apply(builder);
        new SafeMarkdownPreset().apply(builder);
    }
}