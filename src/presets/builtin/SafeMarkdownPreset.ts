import type {EditorPreset} from "../contracts";
import type {ModuloEditorBuilder} from "../../core";
import {DefaultEditorDomResolver} from "../../dom";
import {
    DEFAULT_HTML_SANITIZER_CONFIG,
    DefaultMarkdownProcessor,
    DomPurifyHtmlSanitizer,
    PlainTextMarkdownParser
} from "../../markdown";

export class SafeMarkdownPreset implements EditorPreset {
    public readonly name = "starter-kit";

    public apply(builder: ModuloEditorBuilder): void {
        builder
            .withDomResolver(new DefaultEditorDomResolver())
            .withMarkdown(new DefaultMarkdownProcessor(
                new PlainTextMarkdownParser(),
                new DomPurifyHtmlSanitizer(DEFAULT_HTML_SANITIZER_CONFIG)
            ))
        ;
    }
}