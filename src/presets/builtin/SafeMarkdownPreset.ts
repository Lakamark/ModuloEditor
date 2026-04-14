import type {EditorPreset} from "../contracts";
import type {ModuloEditorBuilder} from "../../core";
import {DEFAULT_HTML_SANITIZER_CONFIG, DomPurifyHtmlSanitizer} from "../../markdown";


export class SafeMarkdownPreset implements EditorPreset {
    public readonly name = "safe-markdown";

    public apply(builder: ModuloEditorBuilder): void {
        builder.withHtmlSanitizer(
            new DomPurifyHtmlSanitizer(DEFAULT_HTML_SANITIZER_CONFIG)
        )
    }
}