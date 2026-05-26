import {CommandButtonPlugin} from "../base";
import type {ButtonToolbarPluginOptions} from "../../contracts";

export class ItalicToolbarPlugin extends CommandButtonPlugin {
    public constructor(
        options: ButtonToolbarPluginOptions = {}
    ) {
        super({
            pluginName: "toolbar-italic",
            commandName: "italic",
            content: options.content ?? "Italic",
            shortcut: options.shortcut ?? "Ctrl+I",
        });
    }
}