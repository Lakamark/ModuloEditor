import type {EditorCommand} from "../EditorCommand";

import {BoldCommand} from "./BoldCommand";
import {ItalicCommand} from "./ItalicCommand";
import {HeadingCommand} from "./HeadingCommand";

export {BoldCommand} from "./BoldCommand";
export {ItalicCommand} from "./ItalicCommand";
export {HeadingCommand} from "./HeadingCommand";

/**
 * Creates all builtin editor commands.
 *
 * This function is used internally to register default commands.
 */
export function createBuiltinCommands(): readonly EditorCommand[] {
    return [
        new BoldCommand(),
        new ItalicCommand(),
        new HeadingCommand()
    ];
}