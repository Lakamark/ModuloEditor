import type {EditorPreset} from "../contracts";
import type {ModuloEditorBuilder} from "../../core";
import {DefaultEditorDomResolver} from "../../dom";

export class DefaultEditorPreset implements EditorPreset {
    public readonly name = "default";

    public apply(builder: ModuloEditorBuilder) {
        builder.withDomResolver(new DefaultEditorDomResolver());
    }
}