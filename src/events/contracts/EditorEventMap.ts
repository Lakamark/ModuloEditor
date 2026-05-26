import type {
    EditorLifecycleEventMap,
    EditorContentEventMap,
    EditorCommandEventMap
} from './maps';

export type EditorEventMap =
    EditorLifecycleEventMap
    & EditorContentEventMap
    & EditorCommandEventMap;