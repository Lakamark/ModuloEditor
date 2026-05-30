// Core
export {
    ModuloEditor as ModuloEditorCore,
    DefaultEditorDocument
} from "./core";

export type {
    ModuloEditorOptions,
    EditorDocument,
} from "./core";

// DOM contracts
export type {
    EditorCssClassMap,
    DefaultEditorDomInitializerOptions,
} from './dom/contracts';

// commands
export type {
    BuiltinCommandName,
    EditorCommand,
    EditorCommandContext,
    EditorCommandsApi,
} from "./commands";

// DOM
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

// Input
export type {
    EditorInputAdapter,
    EditorInputState
} from "./input";

export {
    TextareaInputAdapter
} from "./input";

// Output
export type {
    EditorOutputAdapter
} from "./output";

export {
    HtmlPreviewAdapter
} from "./output";

// Textarea
export type {
    TextareaBridge
} from "./textarea";

export {
    HiddenTextareaBridge
} from "./textarea";

// Plugins
export {
    CommandButtonPlugin,
    ToolbarDropdownPlugin,
    BoldToolbarPlugin,
    ItalicToolbarPlugin,
    HeadingToolbarPlugin,
    LinkToolbarPlugin,
    HeadingDropdownPlugin,
    createDefaultToolbarPlugins
} from './plugins'

export type {
    EditorPlugin,
    EditorPluginApi,
    CommandButtonPluginOptions
} from './plugins'

// Markdown
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

// Adapters
export type {
    EditorStatusAdapter,
    EditorStatusState,
    EditorDiagnostic,
} from './status';

export {
    EmptyStatusAdapter,
    WordCountStatusAdapter,
    DiagnosticStatusAdapter,
} from './status';


// Presets
export type {
    EditorPreset
} from "./presets";

export {
    DefaultEditorPreset,
    SafeMarkdownPreset,
    StarterKitPreset,
    MarkedPreset
} from "./presets";

// Events
export {
    SimpleEditorEventBus,
} from './events';

export type {
    EditorEventBus,
    EditorEventListener,
    EditorEventUnsubscribe,
    EditorEventMap,
    EditorLifecycleEventMap,
    EditorContentEventMap,
    EditorCommandEventMap,
} from './events';

// Scroll
export type {
    EditorScrollSection,
    EditorScrollSectionAnalyzer,
    EditorScrollSync,
} from './scroll'

// Utilities
export {
    getCurrentLine,
    splitSelection,
    replaceCurrentLine,
    normalizeHeadingLine,
    createSvgElement,
} from './utils';