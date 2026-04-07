import type {BuiltinCommandName} from "./builtin-command-names";
import {createBuiltinCommands} from "../builtin";
import type {EditorCommand} from "../contracts";


export function resolveBuiltinCommands(
    option: boolean | readonly BuiltinCommandName[] | undefined
): readonly EditorCommand[] {
    const commands = createBuiltinCommands();

    if (option === false) {
        return [];
    }

    if (option === true || option === undefined) {
        return commands;
    }

    const allowedNames = new Set(option);

    return commands.filter((command) =>
        allowedNames.has(command.name as BuiltinCommandName)
    );
}