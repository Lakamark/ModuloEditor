import type {ToolbarContent} from "./ToolbarContent";

/**
 * Shared options used by toolbar button plugins.
 */
export interface ButtonToolbarPluginOptions {
    /**
     * Custom button content.
     */
    readonly content?: ToolbarContent;

    /**
     * Optional keyboard shortcut.
     */
    readonly shortcut?: string;
}