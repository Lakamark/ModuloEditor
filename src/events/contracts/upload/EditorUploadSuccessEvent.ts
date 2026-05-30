/**
 * Triggered when an asset upload completes successfully.
 */
export interface EditorUploadSuccessEvent {
    readonly file: File;
    readonly url: string;
}