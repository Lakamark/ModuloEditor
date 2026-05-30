import type {
    EditorStatusAdapter,
    EditorStatusState,
} from "../contracts";

/**
 * Status adapter that displays editor diagnostics.
 */
export class DiagnosticStatusAdapter implements EditorStatusAdapter {
    private element?: HTMLElement;

    public mount(element: HTMLElement): void {
        this.element = element;
    }

    public update(state: EditorStatusState): void {
        if (!this.element) {
            return;
        }

        const errors = state.diagnostics.filter(
            diagnostic => diagnostic.level === 'error'
        );

        const warnings = state.diagnostics.filter(
            diagnostic => diagnostic.level === 'warning'
        );

        if (errors.length > 0) {
            this.element.textContent =
                `${errors.length} error(s)`;
            return;
        }

        if (warnings.length > 0) {
            this.element.textContent =
                `${warnings.length} warning(s)`;
            return;
        }

        this.element.textContent = '✓ Ready';
    }

    public destroy(): void {
        this.element = undefined;
    }
}