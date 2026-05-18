// core
export {
    ModuloEditor as ModuloEditorBuilder,
    DefaultEditorDocument
} from "./core";

export type {
    ModuloEditorOptions,
    EditorDocument,
} from "./core";

// Dom contracts
export type {
    EditorCssClassMap,
    DefaultEditorDomInitializerOptions,
} from './dom/contracts';

// commands
export type {
    EditorCommand,
    EditorCommandContext,
    EditorCommandsApi,
} from "./commands";


// dom
export type {
    EditorDomResolver,
    EditorDomSlots,
    EditorDomInitializationResult,
    EditorDomInitializer,
} from "./dom";

export {
    DefaultEditorDomResolver,
    DefaultEditorDomInitializer,
} from "./dom";


// input
export type {
    EditorInputAdapter,
    EditorInputState
} from "./input";

export {
    TextareaInputAdapter
} from "./input";


// output
export type {
    EditorOutputAdapter
} from "./output";

export {
    HtmlPreviewAdapter
} from "./output";


// textarea
export type {
    TextareaBridge
} from "./textarea";

export {
    HiddenTextareaBridge
} from "./textarea";


// plugins
export type {
    EditorPlugin,
    EditorPluginApi
} from "./plugins";

export {
    CommandButtonPlugin,
    BoldToolbarPlugin,
    ItalicToolbarPlugin,
    HeadingToolbarPlugin,
    createDefaultToolbarPlugins
} from "./plugins";

export type {
    CommandButtonPluginOptions
} from "./plugins";


// markdown
export type {
    MarkdownParser,
    MarkdownProcessor,
    HtmlSanitizer,
} from "./markdown";

export {
    DefaultMarkdownProcessor,
    PlainTextMarkdownParser,
    MarkedMarkdownParser,
    DomPurifyHtmlSanitizer,
    DEFAULT_HTML_SANITIZER_CONFIG
} from "./markdown";


// presets
export type {
    EditorPreset
} from "./presets";

export {
    DefaultEditorPreset,
    SafeMarkdownPreset,
    StarterKitPreset,
    MarkedPreset
} from "./presets";

// React wrapper
export * from './react';