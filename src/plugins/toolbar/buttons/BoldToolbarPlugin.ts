import {CommandButtonPlugin} from "../base";
import type {ButtonToolbarPluginOptions} from "../../contracts";

/**
 * Toolbar plugin rendering a button for the bold command.
 */
export class BoldToolbarPlugin extends CommandButtonPlugin {
    public constructor(
        options: ButtonToolbarPluginOptions = {}
    ) {
        super({
            pluginName: "toolbar-bold",
            commandName: "bold",
            content: options.content ?? "Bold",
            shortcut: options.shortcut ??"Ctrl+B"
        });
    }
}