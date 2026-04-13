import type {EditorDocument, ModuloEditorBuilder} from "../contracts";
import type {EditorDomInitializationResult, EditorDomInitializer, EditorDomResolver} from "../../dom";
import type {EditorInputAdapter} from "../../input";
import type {EditorOutputAdapter} from "../../output";
import type {TextareaBridge} from "../../textarea";
import type {MarkdownProcessor} from "../../markdown";
import type {EditorPlugin} from "../../plugins";
import type {EditorCommand} from "../../commands";
import type {EditorPreset} from "../../presets";
import {ModuloEditor} from "../ModuloEditor";
import {DefaultEditorDocument} from "../DefaultEditorDocument";

/**
 * Default implementation of the ModuloEditor builder.
 *
 * This builder supports two DOM initialization strategies:
 *
 * 1. Explicit root mode:
 *    the editor uses the root element provided at construction time.
 *
 * 2. Textarea initialization mode:
 *    when both a textarea and a DOM initializer are configured,
 *    the builder delegates DOM creation to the initializer and uses
 *    the returned root element as the editor root.
 */
export class DefaultModuloEditorBuilder implements ModuloEditorBuilder {
    private domResolver?: EditorDomResolver;
    private input?: EditorInputAdapter;
    private output?: EditorOutputAdapter;
    private textareaBridge?: TextareaBridge;
    private markdown?: MarkdownProcessor;
    private plugins: EditorPlugin[] = [];
    private document?: EditorDocument;
    private commands: EditorCommand[] = [];

    private readonly root?: string | HTMLElement;
    private textarea?: HTMLTextAreaElement;
    private domInitializer?: EditorDomInitializer;
    private domInitializationResult?: EditorDomInitializationResult;

    /**
     * Creates a new builder instance.
     *
     * The provided root is used as the fallback editor root when no
     * textarea-based DOM initializer is configured.
     *
     * @param root The editor root element or a selector resolving to it.
     */
    public constructor(root?: string | HTMLElement) {
        this.root = root;
    }

    /**
     * Applies a preset to the current builder.
     *
     * Presets can configure multiple builder dependencies at once,
     * such as adapters, plugins, Markdown processor, or DOM services.
     *
     * @param preset The preset to apply.
     * @returns The current builder instance.
     */
    public usePreset(preset: EditorPreset): this {
        preset.apply(this);

        return this;
    }

    /**
     * Configures the builder from a textarea element or a textarea selector.
     *
     * This method enables textarea-based initialization workflows, such as
     * mounting the editor structure from a classic form textarea through
     * a DOM initializer.
     *
     * If a selector is provided, it must resolve to a valid HTMLTextAreaElement.
     *
     * @param input A textarea element or a selector pointing to a textarea element.
     * @returns The current builder instance.
     * @throws Error When the selector does not match any element.
     * @throws Error When the resolved element is not a textarea.
     */
    public fromTextarea(input: string | HTMLTextAreaElement): this {
        if (typeof input === "string") {
            const element = document.querySelector(input);

            if (element === null) {
                throw new Error(`No element found for selector ${input}`);
            }

            if (!(element instanceof HTMLTextAreaElement)) {
                throw new Error(`Element ${input} is not a textarea`);
            }

            this.textarea = element;
            this.domInitializationResult = undefined;

            return this;
        }

        if (!(input instanceof HTMLTextAreaElement)) {
            throw new Error(`The ${input} is not a textarea`);
        }

        this.textarea = input;
        this.domInitializationResult = undefined;

        return this;
    }

    /**
     * Registers the DOM initializer used to build the editor structure
     * from a source textarea.
     *
     * When both a textarea and a DOM initializer are configured, the builder
     * uses the initializer result as the source of truth for the root element
     * and the final textarea element.
     *
     * @param domInitializer The DOM initializer responsible for mounting the editor structure.
     * @returns The current builder instance.
     */
    public withDomInitializer(domInitializer: EditorDomInitializer): this {
        this.domInitializer = domInitializer;
        this.domInitializationResult = undefined;

        return this;
    }

    /**
     * Registers the DOM resolver used by the editor to resolve its slots.
     *
     * @param domResolver The DOM resolver implementation.
     * @returns The current builder instance.
     */
    public withDomResolver(domResolver: EditorDomResolver): this {
        this.domResolver = domResolver;

        return this;
    }

    /**
     * Registers the input adapter used by the editor.
     *
     * @param input The input adapter implementation.
     * @returns The current builder instance.
     */
    public withInput(input: EditorInputAdapter): this {
        this.input = input;

        return this;
    }

    /**
     * Registers the output adapter used by the editor preview.
     *
     * @param output The output adapter implementation.
     * @returns The current builder instance.
     */
    public withOutput(output: EditorOutputAdapter): this {
        this.output = output;

        return this;
    }

    /**
     * Registers the textarea bridge used to synchronize the editor
     * with a hidden or backing textarea.
     *
     * @param textareaBridge The textarea bridge implementation.
     * @returns The current builder instance.
     */
    public withTextareaBridge(textareaBridge: TextareaBridge): this {
        this.textareaBridge = textareaBridge;

        return this;
    }

    /**
     * Registers the Markdown processor used to transform raw content
     * into preview HTML.
     *
     * @param markdown The Markdown processor implementation.
     * @returns The current builder instance.
     */
    public withMarkdown(markdown: MarkdownProcessor): this {
        this.markdown = markdown;

        return this;
    }

    /**
     * Replaces the current plugin collection with the provided plugins.
     *
     * @param plugins The plugins to register.
     * @returns The current builder instance.
     */
    public withPlugins(plugins: readonly EditorPlugin[]): this {
        this.plugins = [...plugins];

        return this;
    }

    /**
     * Registers the initial editor document.
     *
     * When no document is provided, the builder falls back to
     * a default empty document.
     *
     * @param document The initial editor document.
     * @returns The current builder instance.
     */
    public withDocument(document: EditorDocument): this {
        this.document = document;

        return this;
    }

    /**
     * Replaces the current command collection with the provided commands.
     *
     * @param commands The commands to register.
     * @returns The current builder instance.
     */
    public withCommands(commands: readonly EditorCommand[]): this {
        this.commands = [...commands];

        return this;
    }

    /**
     * Resolves the textarea element associated with the editor.
     *
     * When textarea-based DOM initialization is available, the initializer result
     * becomes the source of truth. Otherwise, the builder falls back to the
     * original textarea configured through {@link fromTextarea}.
     *
     * @returns The resolved textarea element, or null when no textarea is configured.
     */
    public build(): ModuloEditor {
        const root: HTMLElement = this.resolveRootElement();
        const textarea:HTMLTextAreaElement | null = this.resolveTextareaElement();

        if (textarea !== null && this.textareaBridge !== undefined) {
            this.textareaBridge.mount(textarea);
        }


        return new ModuloEditor({
            root,
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

    /**
     * Resolves the explicit root element configured for the builder.
     *
     * When the root was provided as a selector, the selector must resolve
     * to a valid HTMLElement.
     *
     * @returns The resolved root element.
     * @throws Error When the configured root selector cannot be resolved.
     */
    private requireRootElement(): HTMLElement {
        if (this.root === undefined) {
            throw new Error(
                "ModuloEditorBuilder requires a root element when no DOM initializer is configured."
            );
        }

        if (this.root instanceof HTMLElement) {
            return this.root;
        }

        const element = document.querySelector(this.root);

        if (!(element instanceof HTMLElement)) {
            throw new Error(`ModuloEditorBuilder could not resolve root element from selector "${this.root}".`);
        }

        return element;
    }

    /**
     * Returns the configured input adapter.
     *
     * @returns The configured input adapter.
     * @throws Error When no input adapter has been configured.
     */
    private requireInput(): EditorInputAdapter {
        if (!this.input) {
            throw new Error("ModuloEditorBuilder requires an input adapter.");
        }

        return this.input;
    }

    /**
     * Returns the configured output adapter.
     *
     * @returns The configured output adapter.
     * @throws Error When no output adapter has been configured.
     */
    private requireOutput(): EditorOutputAdapter {
        if (!this.output) {
            throw new Error("ModuloEditorBuilder requires an output adapter.");
        }

        return this.output;
    }

    /**
     * Returns the configured Markdown processor.
     *
     * @returns The configured Markdown processor.
     * @throws Error When no Markdown processor has been configured.
     */
    private requireMarkdown(): MarkdownProcessor {
        if (!this.markdown) {
            throw new Error("ModuloEditorBuilder requires a markdown processor.");
        }

        return this.markdown;
    }

    /**
     * Resolves the editor document used as the initial source of truth.
     *
     * When no document has been explicitly configured, a default empty
     * editor document is created.
     *
     * @returns The resolved editor document.
     */
    private resolveDocument(): EditorDocument {
        return this.document ?? new DefaultEditorDocument();
    }

    /**
     * Returns the DOM initialization result when textarea-based initialization
     * is available.
     *
     * The initializer is only executed when both a textarea and a DOM initializer
     * are configured. The result is cached to ensure a single initialization flow
     * is reused by the builder.
     *
     * @returns The DOM initialization result, or null when textarea-based
     * initialization cannot be used.
     */
    private getDomInitializationResult(): EditorDomInitializationResult | null {
        if (!this.textarea || this.domInitializer === undefined) {
            return null;
        }

        if (this.domInitializationResult !== undefined) {
            return this.domInitializationResult;
        }

        this.domInitializationResult = this.domInitializer.initialize(this.textarea);

        return this.domInitializationResult;
    }

    /**
     * Resolves the root element used to create the editor instance.
     *
     * When textarea-based DOM initialization is available, the initialized root
     * element takes precedence. Otherwise, the builder falls back to the explicit
     * root element provided at construction time.
     *
     * @returns The resolved root element.
     * @throws Error When no valid root element can be resolved.
     */
    private resolveRootElement(): HTMLElement {
        const result = this.getDomInitializationResult();

        if (result !== null) {
            return result.root;
        }

        return this.requireRootElement();
    }

    /**
     * Resolves the textarea element associated with the editor.
     *
     * When textarea-based DOM initialization is available, the initializer result
     * becomes the source of truth. Otherwise, the builder falls back to the
     * original textarea configured through {@link fromTextarea}.
     *
     * This method is currently kept as an internal helper for future textarea-driven
     * workflows and does not yet change the current build pipeline.
     *
     * @returns The resolved textarea element, or null when no textarea is configured.
     */
    private resolveTextareaElement(): HTMLTextAreaElement | null {
        const result = this.getDomInitializationResult();

        if (result !== null) {
            return result.textarea;
        }

        return this.textarea ?? null;
    }
}