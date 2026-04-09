import { ModuloEditor } from "../ModuloEditor";
import type { EditorPlugin } from "../../plugins";

import { DefaultEditorDomResolver } from "../../dom";
import { TextareaInputAdapter } from "../../input";
import { HtmlPreviewAdapter } from "../../output";
import { HiddenTextareaBridge } from "../../textarea";
import { createDefaultToolbarPlugins } from "../../plugins";

import {
    DEFAULT_HTML_SANITIZER_CONFIG,
    DefaultMarkdownProcessor,
    DomPurifyHtmlSanitizer,
    PlainTextMarkdownParser
} from "../../markdown";
import type {ModuloEditorBuilder} from "../contracts";

/**
 * Default fluent builder implementation for ModuloEditor.
 *
 * This builder provides a high-level API for common editor setups.
 * It creates a fully configured editor instance using the default
 * DOM resolver, adapters, Markdown processor, sanitizer, textarea bridge,
 * and default toolbar plugins.
 *
 * For advanced and fully manual setups, the `ModuloEditor` constructor
 * can still be used directly.
 *
 * @example
 * ```ts
 * const editor = ModuloEditor
 *     .create('[data-mo-editor]')
 *     .init();
 * ```
 *
 * @example
 * ```ts
 * const editor = ModuloEditor
 *     .create('[data-mo-editor]')
 *     .withoutPlugins()
 *     .init();
 * ```
 *
 * @example
 * ```ts
 * const editor = ModuloEditor
 *     .create('[data-mo-editor]')
 *     .use(new BoldToolbarPlugin(), new ItalicToolbarPlugin())
 *     .init();
 * ```
 */
export class DefaultModuloEditorBuilder implements ModuloEditorBuilder {
    /**
     * Optional custom plugins explicitly configured by the user.
     *
     * - `undefined` means: use default toolbar plugins
     * - `false` means: disable all plugins
     * - `EditorPlugin[]` means: use the provided plugin list
     */
    private plugins: EditorPlugin[] | false | undefined;

    /**
     * Root editor selector or HTMLElement used to initialize the editor.
     */
    private readonly root: string | HTMLElement;

    /**
     * Indicates whether the builder has already been initialized.
     *
     * Used to prevent multiple init() calls and configuration changes
     * after initialization.
     */
    private initialized = false;

    /**
     * Creates a new builder bound to the provided root selector or element.
     *
     * @param root CSS selector or root HTMLElement used to resolve the editor DOM.
     */
    public constructor(root: string | HTMLElement) {
        this.root = root;
    }

    /**
     * Replaces the default plugin list with the provided plugins.
     *
     * Calling this method disables the automatic default toolbar plugin setup
     * and uses only the plugins passed here.
     *
     * @param plugins Plugins to mount on the editor instance.
     *
     * @returns The current builder instance.
     *
     * @throws Error When called after init().
     */
    public use(...plugins: EditorPlugin[]): this {
        this.assertNotInitialized();

        this.plugins = plugins;

        return this;
    }

    /**
     * Disables all plugins for the editor instance.
     *
     * @returns The current builder instance.
     *
     * @throws Error When called after init().
     */
    public withoutPlugins(): this {
        this.assertNotInitialized();

        this.plugins = false;

        return this;
    }

    /**
     * Builds and initializes a new ModuloEditor instance.
     *
     * This method resolves the root element, creates all default editor
     * dependencies, mounts the configured plugin list, initializes the editor,
     * and returns the initialized instance.
     *
     * @returns The initialized editor instance.
     *
     * @throws Error When the configured root selector does not match any element.
     */
    public init(): ModuloEditor {
        if (this.initialized) {
            throw new Error('ModuloEditorBuilder: already initialized.');
        }

        const root = this.resolveRoot(this.root);
        const domResolver = new DefaultEditorDomResolver();

        const plugins = this.plugins === false
            ? []
            : this.plugins ?? createDefaultToolbarPlugins();

        this.initialized = true;

        const editor = new ModuloEditor({
            root,
            domResolver,
            input: new TextareaInputAdapter(),
            output: new HtmlPreviewAdapter(),
            markdown: new DefaultMarkdownProcessor(
                new PlainTextMarkdownParser(),
                new DomPurifyHtmlSanitizer(DEFAULT_HTML_SANITIZER_CONFIG)
            ),
            textareaBridge: new HiddenTextareaBridge(),
            plugins,
        });

        editor.init();

        return editor;
    }

    /**
     * Resolves the configured root into a concrete HTMLElement.
     *
     * When a selector string is provided, the element is queried from the DOM.
     * When an HTMLElement is provided directly, it is returned as-is.
     *
     * @param root CSS selector or root HTMLElement.
     *
     * @returns The resolved root HTMLElement.
     *
     * @throws Error When the selector does not match any HTMLElement.
     */
    private resolveRoot(root: string | HTMLElement): HTMLElement {
        if (typeof root !== "string") {
            return root;
        }

        const element = document.querySelector(root);

        if (!(element instanceof HTMLElement)) {
            throw new Error(`ModuloEditor: root element "${root}" not found.`);
        }

        return element;
    }

    /**
     * Ensures the builder has not been initialized yet.
     *
     * @throws Error When a configuration method is called after init().
     */
    private assertNotInitialized(): void {
        if (this.initialized) {
            throw new Error(
                'ModuloEditorBuilder: configuration cannot be modified after init().'
            );
        }
    }
}