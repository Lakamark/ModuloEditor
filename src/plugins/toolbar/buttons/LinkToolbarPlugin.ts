import {CommandButtonPlugin} from "../base";
import type {ButtonToolbarPluginOptions} from "../../contracts";

export class LinkToolbarPlugin extends CommandButtonPlugin {
    public constructor(
        options: ButtonToolbarPluginOptions = {}
    ) {
        super({
            pluginName: "toolbar-link",
            commandName: "link",
            content: options.content ?? "Link",
            shortcut: options.shortcut ?? "Ctrl+K",
        });
    }
}