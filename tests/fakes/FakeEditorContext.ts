import type {EditorCommandContext} from "../../src/commands/EditorCommandContext";
import {FakeEditorInput} from "./FakeEditorInput";

export function createFakeEditorContext(
    value: string,
    start: number,
    end: number
): EditorCommandContext {
    const input = new FakeEditorInput();

    return {
        input,
        state: {
            value,
            selectionStart: start,
            selectionEnd: end
        }
    }
}