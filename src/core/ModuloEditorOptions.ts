import type {EditorDocument} from "./EditorDocument";
import type {EditorInputAdapter} from "../input";
import type {EditorOutputAdapter} from "../output";
import type {MarkdownProcessor} from "../markdown";

export interface ModuloEditorOptions {
    document?: EditorDocument;
    input: EditorInputAdapter;
    output: EditorOutputAdapter;
    markdown: MarkdownProcessor;
}