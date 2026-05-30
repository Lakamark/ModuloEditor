import type {EditorDocument} from "./EditorDocument";
import type {EditorInputAdapter} from "../../input";
import type {EditorOutputAdapter} from "../../output";
import type {MarkdownProcessor} from "../../markdown";
import type {EditorPlugin} from "../../plugins";
import type {EditorDomResolver} from "../../dom";
import type {TextareaBridge} from "../../textarea";
import type {
    BuiltinCommandName,
    EditorCommand
} from "../../commands";
import type {EditorCssClassMap} from "../../dom/contracts";
import type {EditorStatusAdapter} from "../../status";
/**
 * Options used to configure a ModuloEditor instance.
 */
export interface ModuloEditorOptions {
    /**
     * Optional document used as the initial source of truth.
     */
    readonly document?: EditorDocument;

    /**
     * Input adapter responsible for editor interactions.
     */
    readonly input: EditorInputAdapter;

    /**
     * Output adapter responsible for preview rendering.
     */
    readonly output: EditorOutputAdapter;

    /**
     * Markdown processor used to transform raw content into HTML.
     */
    readonly markdown: MarkdownProcessor;

    /**
     * Optional status adapter used to render information
     * inside the editor status bar.
     *
     * If omitted, the status bar remains empty.
     */
    readonly status?: EditorStatusAdapter;

    /**
     * Custom commands provided by the user.
     */
    readonly commands?: readonly EditorCommand[];

    /**
     * Plugins mounted into the editor lifecycle.
     */
    readonly plugins?: readonly EditorPlugin[];

    /**
     * Controls which builtin commands are enabled.
     *
     * - true / undefined → enable all builtin commands
     * - false → disable all builtin commands
     * - string[] → enable only specified builtin commands
     */
    readonly builtinCommands?: boolean | readonly BuiltinCommandName[];

    /**
     * Optional DOM resolver used by the editor to resolve
     * internal UI slots and editor elements.
     *
     * The resolver acts as the bridge between the editor core
     * and the rendered DOM structure.
     *
     * When omitted, the editor falls back to its default
     * DOM resolution strategy.
     */
    readonly domResolver?: EditorDomResolver;

    /**
     * Optional bridge used to synchronize a hidden textarea.
     */
    readonly textareaBridge?: TextareaBridge;

    /**
     * Passé throught the CSS options
     */
    readonly classes?: Partial<EditorCssClassMap>;
}