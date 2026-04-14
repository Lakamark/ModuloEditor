import type {EditorPreset} from "../contracts";
import type {ModuloEditorBuilder} from "../../core";
import {MarkedMarkdownParser} from "../../markdown";

/**
 * Preset that configures Marked as the Markdown parser
 * with a DOMPurify-based sanitizer.
 */
export class MarkedPreset implements EditorPreset {
    public readonly name = "marked-markdown";

    public apply(builder: ModuloEditorBuilder) {
        builder.withMarkdownParserIfMissing(new MarkedMarkdownParser());
    }
}