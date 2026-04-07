import type {EditorPluginApi} from "./EditorPluginApi";

/**
 * Contract implemented by editor plugins.
 */
export interface EditorPlugin {
    /**
     * Unique plugin name.
     */
    readonly name: string;

    /**
     * Called when the plugin is initialized.
     */
    setup(api: EditorPluginApi): void;

    /**
     * Called when the plugin is destroyed.
     */
    destroy(): void;
}