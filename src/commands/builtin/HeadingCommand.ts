import type {
    CurrentLine,
    EditorCommand,
    EditorCommandContext
} from "../contracts";
import {
    getCurrentLine,
    normalizeHeadingLine,
    replaceCurrentLine
} from "../../utils";


export class HeadingCommand implements EditorCommand {
    public readonly name: string;
    private readonly level: number;

    public constructor(level: number) {
        if (level < 1 || level > 6) {
            throw new Error("Heading level must be between 1 and 6.");
        }

        this.level = level;
        this.name = `heading-${level}`;
    }

    public execute(context: EditorCommandContext): void {
        const {input, state} = context;
        const {value, selectionStart} = state;

        const line: CurrentLine = getCurrentLine(value, selectionStart);
        const prefix = `${"#".repeat(this.level)} `;

        const normalized = normalizeHeadingLine(line.content)

        const replacement = `${prefix}${normalized}`;

        const newValue = replaceCurrentLine(value, line, replacement);

        input.setValue(newValue);
        input.setSelection(
            selectionStart + prefix.length,
            selectionStart + prefix.length
        );
        input.focus();
    }
}