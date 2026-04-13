/**
 * CSS class map used by the default DOM initializer.
 *
 * These classes are only used for styling and may be overridden freely.
 * They are not part of the editor DOM contract.
 */
export interface EditorCssClassMap {
    readonly root?: string;
    readonly header?: string;
    readonly toolbar?: string;
    readonly body?: string;
    readonly input?: string;
    readonly preview?: string;
    readonly footer?: string;
    readonly status?: string;
    readonly textarea?: string;
}