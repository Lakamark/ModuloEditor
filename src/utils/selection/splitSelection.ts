import type {SelectionParts} from "../../commands";

export function splitSelection(
    value: string,
    selectionStart: number,
    selectionEnd: number
): SelectionParts {
    return {
        before: value.slice(0, selectionStart),
        selected: value.slice(selectionStart, selectionEnd),
        after: value.slice(selectionEnd),
    }
}