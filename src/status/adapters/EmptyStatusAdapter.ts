import type {
    EditorStatusAdapter,
    EditorStatusState
} from "../contracts";

/**
 * No-op status adapter.
 *
 * Used when the editor status bar is available in the DOM,
 * but no visible status information should be rendered.
 */
export class EmptyStatusAdapter implements EditorStatusAdapter {
    public mount(_element: HTMLElement): void {
        // Intentionally empty.
    }

    public update(_state: EditorStatusState): void {
        // Intentionally empty.
    }

    public destroy(): void {
        // Intentionally empty.
    }
}