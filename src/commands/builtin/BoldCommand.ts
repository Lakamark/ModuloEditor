import type {
    EditorCommand,
    EditorCommandContext
} from "../contracts";
import {splitSelection} from "../../utils";

/**
 * Wraps the current selection with Markdown bold markers.
 */
export class BoldCommand implements EditorCommand {
    public readonly name = "bold";

    public execute(context: EditorCommandContext): void {
        const { input, state } = context;
        const { value, selectionStart, selectionEnd } = state;
        const { before, selected, after } = splitSelection(
            value,
            selectionStart,
            selectionEnd,
        );

        if (selected) {
            const wrapped = `**${selected}**`;
            const nextValue = `${before}${wrapped}${after}`;

            input.setValue(nextValue);
            input.focus();
            input.setSelection(
                selectionStart + 2,
                selectionEnd + 2
            );

            return;
        }

        const nextValue = `${before}****${after}`;
        const cursor = selectionStart + 2;

        input.setValue(nextValue);
        input.focus();
        input.setSelection(cursor, cursor);
    }
}