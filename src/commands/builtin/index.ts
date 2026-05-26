import {BoldCommand} from "./BoldCommand";
import {ItalicCommand} from "./ItalicCommand";
import {HeadingCommand} from "./HeadingCommand";
import {LinkCommand} from "./LinkCommand";
import type {EditorCommand} from "../contracts";

export {BoldCommand} from "./BoldCommand";
export {ItalicCommand} from "./ItalicCommand";
export {HeadingCommand} from "./HeadingCommand";
export {LinkCommand} from "./LinkCommand";

/**
 * Creates all builtin editor commands.
 *
 * This function is used internally to register default commands.
 */
export function createBuiltinCommands(): readonly EditorCommand[] {
    return [
        new BoldCommand(),
        new ItalicCommand(),
        new LinkCommand(),
        new HeadingCommand(1),
        new HeadingCommand(2),
        new HeadingCommand(3),
        new HeadingCommand(4),
        new HeadingCommand(5),
        new HeadingCommand(6),
    ];
}
