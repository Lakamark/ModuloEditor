/**
 * Triggered when an asset upload fails.
 */
export interface EditorUploadErrorEvent {
    readonly file: File;
    readonly error: unknown;
}