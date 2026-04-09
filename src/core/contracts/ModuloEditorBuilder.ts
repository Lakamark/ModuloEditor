import type {EditorPreset} from "../../presets";
import type {EditorDomResolver} from "../../dom/contracts";
import type {EditorInputAdapter} from "../../input";
import type {EditorOutputAdapter} from "../../output";
import type {TextareaBridge} from "../../textarea";
import type {MarkdownProcessor} from "../../markdown";
import type {EditorPlugin} from "../../plugins";

export interface ModuloEditorBuilder {
    usePreset(preset: EditorPreset): this;
    withDomResolver(domResolver: EditorDomResolver): this;
    withInput(input: EditorInputAdapter): this;
    withOutput(output: EditorOutputAdapter): this;
    withTextareaBridge(textareaBridge: TextareaBridge): this;
    withMarkdown(markdown: MarkdownProcessor): this;
    withPlugins(plugins: readonly EditorPlugin[]): this;
}