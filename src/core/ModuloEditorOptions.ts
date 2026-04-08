import type { EditorDocument } from "./EditorDocument";

import type {
    BuiltinCommandName,
    EditorCommand,
} from "../commands";

import type { EditorInputAdapter } from "../input";
import type { MarkdownProcessor } from "../markdown";
import type { EditorOutputAdapter } from "../output";
import type { EditorPlugin } from "../plugins"
import type {TextareaBridge} from "../textarea";
import type {EditorDomResolver} from "../dom";

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

    readonly root: HTMLElement;
    readonly domResolver?: EditorDomResolver;

    /**
     * Optional bridge used to synchronize a hidden textarea.
     */
    readonly textareaBridge?: TextareaBridge;
}