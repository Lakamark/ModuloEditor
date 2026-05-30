import type {
    EditorLifecycleEventMap,
    EditorContentEventMap,
    EditorCommandEventMap,
    EditorUploadMap
} from './maps';

export type EditorEventMap =
    EditorLifecycleEventMap
    & EditorContentEventMap
    & EditorCommandEventMap
    & EditorUploadMap;