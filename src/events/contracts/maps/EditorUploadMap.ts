import type {
    EditorUploadErrorEvent,
    EditorUploadRequestEvent,
    EditorUploadSuccessEvent
} from "../upload";

/**
 * Upload-related events exposed by the editor.
 *
 * These events allow applications to integrate custom
 * asset storage providers without coupling the editor
 * to a specific backend or cloud service.
 *
 * Supported lifecycle:
 *
 * - `asset:upload-request` → upload requested
 * - `asset:upload-success` → upload completed successfully
 * - `asset:upload-error` → upload failed
 */
export interface EditorUploadMap {
    /**
     * Emitted when an asset upload is requested.
     */
    'asset:upload-request': EditorUploadRequestEvent;

    /**
     * Emitted when an asset upload completes successfully.
     */
    'asset:upload-success': EditorUploadSuccessEvent;

    /**
     * Emitted when an asset upload fails.
     */
    'asset:upload-error': EditorUploadErrorEvent;
}