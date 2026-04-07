import type {EditorCommand} from "../../src/commands/EditorCommand";
import type {EditorCommandContext} from "../../src/commands/EditorCommandContext";

export class FakeEditorCommand implements EditorCommand {
    public name = 'fake';

    public executed = false;

    public execute(context: EditorCommandContext) {
        const {input, state} = context;
        const { value, selectionStart } = state;

        const before = value.slice(0, selectionStart);
        const after = value.slice(selectionStart);

        const nextValue = `${before}fake${after}`;
        const cursor = selectionStart + 4;

        input.setValue(nextValue);
        input.focus();
        input.setSelection(cursor, cursor);
        this.executed = true;
    }
}