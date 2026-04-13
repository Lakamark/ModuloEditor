import "./style/modulo-editor.css";

// core
export { ModuloEditor } from "./core";
export type {
    ModuloEditorOptions,
    EditorDocument,
    ModuloEditorBuilder
} from "./core";

export {
    DefaultEditorDocument
} from "./core";


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
    StarterKitPreset
} from "./presets";