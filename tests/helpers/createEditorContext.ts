import type {EditorInputAdapter} from "../../src/input";
import type {EditorCommandContext} from "../../src";

export function createEditorContext(
    input: EditorInputAdapter
): EditorCommandContext {
    return {
        input,
        state: input.getState()
    }
}