import type {EditorCssClassMap} from "./EditorCssClassMap";

/**
 * Options used to configure the default DOM initializer.
 */
export interface DefaultEditorDomInitializerOptions {
    /**
     * Optional CSS classes applied to the generated editor structure.
     *
     * These classes affect presentation only and do not change the internal
     * DOM contract based on data attributes.
     */
    readonly classes?: EditorCssClassMap;
}