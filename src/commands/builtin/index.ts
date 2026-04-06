import {BoldCommand} from "./BoldCommand";
import {ItalicCommand} from "./ItalicCommand";
import {HeadingCommand} from "./HeadingCommand";

export {BoldCommand} from "./BoldCommand";
export {ItalicCommand} from "./ItalicCommand"
export {HeadingCommand} from "./HeadingCommand";

export const builtinCommands = [
    new BoldCommand(),
    new ItalicCommand(),
    new HeadingCommand()
];