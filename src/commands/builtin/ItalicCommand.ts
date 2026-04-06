import type {EditorCommand} from "../EditorCommand";
import type {EditorCommandContext} from "../EditorCommandContext";

export class ItalicCommand implements EditorCommand {
    public name = 'italic';

    execute(_context: EditorCommandContext) {
        // write the code here.
    }
}