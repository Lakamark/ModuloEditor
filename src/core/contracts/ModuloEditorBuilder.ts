import type {EditorPreset} from "../../presets";
import type {EditorDomInitializer, EditorDomResolver} from "../../dom/contracts";
import type {EditorInputAdapter} from "../../input";
import type {EditorOutputAdapter} from "../../output";
import type {TextareaBridge} from "../../textarea";
import type {MarkdownProcessor} from "../../markdown";
import type {EditorPlugin} from "../../plugins";
import type {ModuloEditor} from "../ModuloEditor";
import type {EditorDocument} from "./EditorDocument";
import type {EditorCommand} from "../../commands";

export interface ModuloEditorBuilder {
    usePreset(preset: EditorPreset): this;
    fromTextarea(input: string | HTMLTextAreaElement): this;
    withDomInitializer(domInitializer: EditorDomInitializer): this;
    withDomResolver(domResolver: EditorDomResolver): this;
    withInput(input: EditorInputAdapter): this;
    withOutput(output: EditorOutputAdapter): this;
    withTextareaBridge(textareaBridge: TextareaBridge): this;
    withMarkdown(markdown: MarkdownProcessor): this;
    withPlugins(plugins: readonly EditorPlugin[]): this;
    withDocument(document: EditorDocument): this;
    withCommands(commands: readonly EditorCommand[]): this;
    build(): ModuloEditor;
}