import type {EditorInputState} from "./EditorInputState";
import type {EditorInput} from "./EditorInput";

/**
 * Runtime context provided to editor commands.
 */
export interface EditorCommandContext {
    /**
     * Input adapter used to read and write the editor value.
     */
    readonly input: EditorInput;

    /**
     * Snapshot of the current editor state.
     */
    readonly state: EditorInputState;
}