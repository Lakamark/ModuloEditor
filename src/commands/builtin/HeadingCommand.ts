import type {
    EditorCommand,
    EditorCommandContext
} from "../contracts";

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

        const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
        const nextLineBreak = value.indexOf("\n", selectionStart);
        const lineEnd = nextLineBreak === -1 ? value.length : nextLineBreak;

        const line = value.slice(lineStart, lineEnd);
        const prefix = `${"#".repeat(this.level)} `;

        const newValue =
            value.slice(0, lineStart) +
            prefix +
            line +
            value.slice(lineEnd);

        input.setValue(newValue);
        input.setSelection(
            selectionStart + prefix.length,
            selectionStart + prefix.length
        );
        input.focus();
    }
}