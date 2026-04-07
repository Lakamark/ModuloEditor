import {isBuiltinCommandName} from './builtin-command-names';
import type {EditorCommand} from "../contracts";

/**
 * Validates custom commands provided by the user.
 *
 * This function ensures that:
 * - no command overrides a reserved builtin command name
 * - no duplicate command names are defined
 *
 * Throws an error if a rule is violated.
 */
export function assertCustomCommandsAreValid(
    commands: readonly EditorCommand[]
): void {
    /**
     * Tracks command names to detect duplicates.
     */
    const names = new Set<string>();

    for (const command of commands) {
        /**
         * Prevent overriding builtin commands.
         */
        if (isBuiltinCommandName(command.name)) {
            throw new Error(
                `Editor command "${command.name}" is reserved by the editor core.`
            );
        }

        /**
         * Prevent duplicate custom commands.
         */
        if (names.has(command.name)) {
            throw new Error(
                `Editor command "${command.name}" is already defined.`
            );
        }

        names.add(command.name);
    }
}