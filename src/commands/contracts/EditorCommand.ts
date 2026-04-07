import type {EditorCommandContext} from "./EditorCommandContext";

/**
 * Contract implemented by editor commands.
 *
 * A command encapsulates one editor action such as bold, italic,
 * heading insertion, or list creation.
 */
export interface EditorCommand {
    /**
     * Unique command name.
     */
    readonly name: string;

    /**
     * Executes the command using the provided editor context.
     */
    execute(context: EditorCommandContext): void;
}