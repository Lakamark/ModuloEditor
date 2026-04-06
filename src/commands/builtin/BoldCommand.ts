import type {EditorCommand} from "../EditorCommand";
import type {EditorCommandContext} from "../EditorCommandContext";


/**
 * Wraps the current selection with Markdown bold markers.
 */
export class BoldCommand implements EditorCommand {
    public readonly name = "bold";

    public execute(context: EditorCommandContext): void {
        const {input, state} = context;
        const {value, selectionStart, selectionEnd} = state;

        const selectedText = value.slice(selectionStart, selectionEnd);
        const beforeSelection = value.slice(0, selectionStart);
        const afterSelection = value.slice(selectionEnd);

        if (selectedText.length > 0) {
            const wrappedText = `**${selectedText}**`;
            const nextValue = `${beforeSelection}${wrappedText}${afterSelection}`;

            input.setValue(nextValue);
            input.focus();
            input.setSelection(
                selectionStart + 2,
                selectionEnd + 2
            );

            return;
        }

        const insertedText = "****";
        const nextValue = `${beforeSelection}${insertedText}${afterSelection}`;
        const cursorPosition = selectionStart + 2;

        input.setValue(nextValue);
        input.focus();
        input.setSelection(cursorPosition, cursorPosition);
    }
}