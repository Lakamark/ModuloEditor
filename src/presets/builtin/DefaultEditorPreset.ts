import type {EditorPreset} from "../contracts";
import type {ModuloEditorBuilder} from "../../core";
import {DefaultEditorDomResolver} from "../../dom";
import {TextareaInputAdapter} from "../../input";
import {HtmlPreviewAdapter} from "../../output";
import {HiddenTextareaBridge} from "../../textarea";

export class DefaultEditorPreset implements EditorPreset {
    public readonly name = "default";

    public apply(builder: ModuloEditorBuilder): void {
        builder
            .withDomResolver(new DefaultEditorDomResolver())
            .withInput(new TextareaInputAdapter())
            .withOutput(new HtmlPreviewAdapter())
            .withTextareaBridge(new HiddenTextareaBridge())
        ;
    }
}