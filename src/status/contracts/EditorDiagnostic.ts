/**
 * Represents a validation issue detected by the editor.
 *
 * Diagnostics may be used by status adapters, plugins,
 * or external tooling to display warnings and errors.
 */
export interface EditorDiagnostic {
    /**
     * Severity level of the diagnostic.
     */
    readonly level: 'warning' | 'error';

    /**
     * Human-readable diagnostic message.
     */
    readonly message: string;
}