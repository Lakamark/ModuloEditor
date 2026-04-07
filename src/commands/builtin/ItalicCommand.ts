import type {
    EditorCommand,
    EditorCommandContext
} from "../contracts";

export class ItalicCommand implements EditorCommand {
    public readonly name = "italic";

    public execute(context: EditorCommandContext): void {
        const {input, state} = context;
        const {value, selectionStart, selectionEnd} = state;

        const before = value.slice(0, selectionStart);
        const selected = value.slice(selectionStart, selectionEnd);
        const after = value.slice(selectionEnd);

        if (selectionStart === selectionEnd) {
            input.setValue(`${before}**${after}`);
            input.setSelection(selectionStart + 1, selectionStart + 1);
            input.focus();

            return;
        }

        input.setValue(`${before}*${selected}*${after}`);
        input.setSelection(selectionStart + 1, selectionEnd + 1);
        input.focus();
    }
}