/**
 * Public API used by plugins to interact with editor commands.
 */
export interface EditorCommandsApi {
    /**
     * Executes a command by name.
     */
    execute(name: string): void;

    /**
     * Checks whether a command is registered.
     */
    has(name: string): boolean;
}