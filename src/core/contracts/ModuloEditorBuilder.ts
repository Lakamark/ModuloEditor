import type {EditorPlugin} from "../../plugins";
import type {ModuloEditor} from "../ModuloEditor";

/**
 * Fluent builder used to configure and create a ModuloEditor instance.
 *
 * This builder provides a higher-level API for common editor setups while
 * keeping the low-level `ModuloEditor` constructor available for advanced use cases.
 */
export interface ModuloEditorBuilder {
    /**
     * Replaces the default plugin list with the provided plugins.
     */
    use(...plugins: EditorPlugin[]): this;

    /**
     * Disables all default plugins.
     */
    withoutPlugins(): this;

    /**
     * Builds and initializes the editor instance.
     */
    init(): ModuloEditor;
}