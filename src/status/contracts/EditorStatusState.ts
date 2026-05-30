import type {EditorDiagnostic} from "./EditorDiagnostic";

/**
 * Snapshot of editor state exposed to status adapters.
 */
export interface EditorStatusState {
    /**
     * Raw Markdown content.
     */
    readonly value: string;

    /**
     * Rendered HTML preview.
     */
    readonly html: string;

    /**
     * Total number of characters.
     */
    readonly characters: number;

    /**
     * Total number of words.
     */
    readonly words: number;

    /**
     * Diagnostics detected by the editor.
     *
     * This collection may be empty when no validation
     * system is configured.
     */
    readonly diagnostics: readonly EditorDiagnostic[];
}