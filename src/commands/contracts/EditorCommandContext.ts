import type {EditorInputAdapter, EditorInputState} from "../../input";

/**
 * Runtime context provided to editor commands.
 */
export interface EditorCommandContext {
    /**
     * Input adapter used to read and write the editor value.
     */
    readonly input: EditorInputAdapter;

    /**
     * Snapshot of the current editor state.
     */
    readonly state: EditorInputState;
}