import type {
    EditorDocument,
    ModuloEditorBuilder,
} from "../contracts";
import type { EditorPreset } from "../../presets";
import type {EditorDomInitializer, EditorDomResolver} from "../../dom/contracts";
import type { EditorInputAdapter } from "../../input";
import type { EditorOutputAdapter } from "../../output";
import type { TextareaBridge } from "../../textarea";
import type { MarkdownProcessor } from "../../markdown";
import type { EditorPlugin } from "../../plugins";
import { ModuloEditor } from "../ModuloEditor";
import { DefaultEditorDocument } from "../DefaultEditorDocument";
import type { EditorCommand } from "../../commands";

export class DefaultModuloEditorBuilder implements ModuloEditorBuilder {
    private domResolver?: EditorDomResolver;
    private input?: EditorInputAdapter;
    private output?: EditorOutputAdapter;
    private textareaBridge?: TextareaBridge;
    private markdown?: MarkdownProcessor;
    private plugins: EditorPlugin[] = [];
    private document?: EditorDocument;
    private commands: EditorCommand[] = [];

    private readonly root: string | HTMLElement;
    private textarea?:  HTMLTextAreaElement;
    private domInitializer?: EditorDomInitializer;

    public constructor(root: string | HTMLElement) {
        this.root = root;
    }

    public usePreset(preset: EditorPreset): this {
        preset.apply(this);

        return this;
    }

    public fromTextarea(input: string | HTMLTextAreaElement): this {
        if (typeof input === "string") {
            const element = document.querySelector(input);
            if(element === null) {
                throw new Error(`No element found for selector ${input}`);
            } else if (!(element instanceof HTMLTextAreaElement)) {
                throw new Error(`Element ${input} is not a textarea`)
            }
            this.textarea = element;

            return this;
        }

        if (!(input instanceof HTMLTextAreaElement)) {
            throw new Error(`The ${input} is not a textarea`);
        }

        this.textarea = input;

        return this;
    }

    public withDomInitializer(domInitializer: EditorDomInitializer): this {
        this.domInitializer = domInitializer;

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

    public withDocument(document: EditorDocument): this {
        this.document = document;

        return this;
    }

    public withCommands(commands: readonly EditorCommand[]): this {
        this.commands = [...commands];

        return this;
    }

    public build(): ModuloEditor {
        return new ModuloEditor({
            root: this.resolveRootElement(),
            domResolver: this.domResolver,
            input: this.requireInput(),
            output: this.requireOutput(),
            textareaBridge: this.textareaBridge,
            markdown: this.requireMarkdown(),
            plugins: this.plugins,
            commands: this.commands,
            document: this.resolveDocument()
        });
    }

    private requireRootElement(): HTMLElement {
        if (this.root instanceof HTMLElement) {
            return this.root;
        }

        const element = document.querySelector(this.root);

        if (!(element instanceof HTMLElement)) {
            throw new Error(`ModuloEditorBuilder could not resolve root element from selector "${this.root}".`);
        }

        return element;
    }

    private requireInput(): EditorInputAdapter {
        if (!this.input) {
            throw new Error("ModuloEditorBuilder requires an input adapter.");
        }

        return this.input;
    }

    private requireOutput(): EditorOutputAdapter {
        if (!this.output) {
            throw new Error("ModuloEditorBuilder requires an output adapter.");
        }

        return this.output;
    }

    private requireMarkdown(): MarkdownProcessor {
        if (!this.markdown) {
            throw new Error("ModuloEditorBuilder requires a markdown processor.");
        }

        return this.markdown;
    }

    private resolveDocument(): EditorDocument {
        return this.document ?? new DefaultEditorDocument();
    }

    private resolveRootElement(): HTMLElement {
       if (this.textarea) {
           if (this.domInitializer === undefined) {
               return this.requireRootElement();
           }

           const result = this.domInitializer.initialize(this.textarea);
           return result.root;
       }

       return this.requireRootElement();
    }
}