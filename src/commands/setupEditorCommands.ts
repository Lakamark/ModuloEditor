import type {BuiltinCommandName} from "./builtin-command-names";
import type {EditorCommand} from "./EditorCommand";
import type {EditorCommandRegistry} from "./EditorCommandRegistry";
import {resolveBuiltinCommands} from "./resolveBuiltinCommands";
import {assertCustomCommandsAreValid} from "./assertCustomCommandsAreValid";

/**
 * Options used to configure editor commands.
 */
export interface SetupEditorCommandsOptions {
    /**
     * Controls which builtin commands are enabled.
     *
     * - true / undefined → enable all builtin commands
     * - false → disable all builtin commands
     * - string[] → enable only specified builtin commands
     */
    readonly builtinCommands?: boolean | readonly BuiltinCommandName[];

    /**
     * Custom commands provided by the user.
     */
    readonly commands?: readonly EditorCommand[];
}

/**
 * Registers builtin and custom commands into the registry.
 *
 * This function:
 * - resolves builtin commands
 * - validates custom commands
 * - registers commands in the correct order
 */
export function setupEditorCommands(
    registry: EditorCommandRegistry,
    options: SetupEditorCommandsOptions
): void {
    /**
     * Resolve builtin commands based on configuration.
     */
    const builtinCommands = resolveBuiltinCommands(options.builtinCommands);

    /**
     * Custom commands defined by the user.
     */
    const customCommands = options.commands ?? [];

    /**
     * Validate custom commands.
     * This prevents overriding builtin commands
     * and duplicate custom commands.
     */
    assertCustomCommandsAreValid(customCommands);

    /**
     * Register builtin commands first.
     */
    for (const command of builtinCommands) {
        registry.register(command);
    }

    /**
     * Register custom commands.
     */
    for (const command of customCommands) {
        registry.register(command);
    }
}