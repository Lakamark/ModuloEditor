import type {
    EditorCommand,
    EditorCommandContext
} from "../contracts";
import {splitSelection} from "../../utils";

export class LinkCommand implements EditorCommand {
    public readonly name =  "link";

    public execute(context: EditorCommandContext): void {
        const { input, state } = context;
        const { value, selectionStart, selectionEnd } = state;
        const { before, selected, after } = splitSelection(
            value,
            selectionStart,
            selectionEnd,
        );

        const url = window.prompt("Enter URL");

        if (!url) {
            return;
        }

        const label = selected || "link";
        const replacement = `[${label}](${url})`;

        input.setValue(`${before}${replacement}${after}`);

        const labelStart = selectionStart + 1;
        const labelEnd = labelStart + label.length;

        input.setSelection(labelStart, labelEnd);
        input.focus();
    }
}