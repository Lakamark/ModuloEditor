import type {ToolbarContent} from "../../contracts";

/**
 * Options used to create a command button plugin.
 */
export interface CommandButtonPluginOptions {
    /**
     * Unique plugin name.
     */
    readonly pluginName: string;

    /**
     * Command executed when the button is clicked.
     */
    readonly commandName: string;

    /**
     * Button visual content.
     *
     * Supports:
     *
     * - plain text labels
     * - custom DOM elements (SVG, icons, spans, etc.)
     * - factories returning fresh DOM elements
     *
     * Factories are recommended when the same plugin
     * instance may be mounted multiple times.
     */
    readonly content: ToolbarContent;

    /**
     * Optional keyboard shortcut triggering the command.
     *
     * Examples:
     * - "Ctrl+B"
     * - "Meta+B"
     * - "Shift+Alt+1"
     */
    readonly shortcut?: string;
}