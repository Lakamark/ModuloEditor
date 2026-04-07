/**
 * List of builtin command names reserved by the editor core.
 *
 * These names cannot be overridden by user-defined commands,
 * even if the builtin command is not enabled.
 */
export const BUILTIN_COMMAND_NAMES = [
    'bold',
    'italic',
    'heading'
] as const;

/**
 * Type representing a builtin command name.
 */
export type BuiltinCommandName = typeof BUILTIN_COMMAND_NAMES[number];

/**
 * Checks whether a command name is reserved by the editor core.
 */
export function isBuiltinCommandName(name: string): name is BuiltinCommandName {
    return BUILTIN_COMMAND_NAMES.includes(name as BuiltinCommandName);
}