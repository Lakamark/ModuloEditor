import type {BuiltinCommandName} from "../commands/builtin-command-names";
import type {EditorCommand} from "../commands/EditorCommand";
import type {EditorPlugin} from "../plugins/EditorPlugin";

/**
 * Public options used to configure the editor.
 */
export interface ModuloEditorOptions {
    /**
     * Controls which builtin commands are enabled.
     *
     * - true / undefined -> enable all builtin commands
     * - false -> disable all builtin commands
     * - string[] -> enable only selected builtin commands
     */
    readonly builtinCommands?: boolean | readonly BuiltinCommandName[];

    /**
     * Custom commands provided by the user.
     */
    readonly commands?: readonly EditorCommand[];

    /**
     * Plugins attached to the editor.
     */
    readonly plugins?: readonly EditorPlugin[];
}