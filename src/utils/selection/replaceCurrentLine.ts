import type {CurrentLine} from "../../commands";

export function replaceCurrentLine(
    value: string,
    line: CurrentLine,
    replacement: string
): string {
    return (
        value
            .slice(0, line.start) +
            replacement +
            value.slice(line.end)
    );
}