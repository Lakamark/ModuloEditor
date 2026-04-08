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
     * Button content.
     *
     * Can be:
     * - plain text
     * - an HTMLElement
     * - a factory returning an HTMLElement
     */
    readonly content: string | HTMLElement | (() => HTMLElement);
}