import type {ModuloEditorBuilder} from "../contracts";
import type {EditorPreset} from "../../presets";
import type {EditorDomResolver} from "../../dom/contracts";
import type {EditorInputAdapter} from "../../input";
import type {EditorOutputAdapter} from "../../output";
import type {TextareaBridge} from "../../textarea";
import type {MarkdownProcessor} from "../../markdown";
import type {EditorPlugin} from "../../plugins";

export class DefaultModuloEditorBuilder implements ModuloEditorBuilder {
    // @ts-ignore
    private domResolver?: EditorDomResolver;

    // @ts-ignore
    private input?: EditorInputAdapter;

    // @ts-ignore
    private output?: EditorOutputAdapter;

    // @ts-ignore
    private textareaBridge?: TextareaBridge;

    // @ts-ignore
    private markdown?: MarkdownProcessor;

    // @ts-ignore
    private plugins?: EditorPlugin[] = [];

    // @ts-ignore
    private readonly root: string | HTMLElement;

    public constructor(root: string | HTMLElement) {
        this.root = root;
    }

    public usePreset(preset: EditorPreset): this {
        preset.apply(this);

        return this;
    }

    public withDomResolver(domResolver: EditorDomResolver): this {
        this.domResolver = domResolver;

        return this;
    }

    public withInput(input: EditorInputAdapter): this {
        this.input = input;

        return this;
    }

    public withOutput(output: EditorOutputAdapter): this {
        this.output = output;

        return this;
    }

    public withTextareaBridge(textareaBridge: TextareaBridge): this {
        this.textareaBridge = textareaBridge;

        return this;
    }

    public withMarkdown(markdown: MarkdownProcessor): this {
        this.markdown = markdown;

        return this;
    }

    public withPlugins(plugins: readonly EditorPlugin[]): this {
        this.plugins = [...plugins];

        return this;
    }
}