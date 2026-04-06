import type {EditorCommand} from "../EditorCommand";
import type {EditorCommandContext} from "../EditorCommandContext";

export class HeadingCommand implements EditorCommand {
    public name = 'headings'

    public execute(_context: EditorCommandContext) {
        // write the code.
    }
}