import type {
    EditorCommandContext,
    EditorInputAdapter
} from "../../src";

export function createEditorContext(
    input: EditorInputAdapter
): EditorCommandContext {
    return {
        input,
        state: input.getState()
    }
}