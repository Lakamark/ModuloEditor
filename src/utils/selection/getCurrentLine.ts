import type {CurrentLine} from "../../commands";

export function getCurrentLine(
    value: string,
    cursor: number
): CurrentLine {
    const start = value.lastIndexOf("\n", cursor - 1) + 1;

    const nextLineBreak = value.indexOf("\n", cursor);

    const end =
        nextLineBreak === -1
            ? value.length
            : nextLineBreak;

    return {
        start,
        end,
        content: value.slice(start, end),
    }
}