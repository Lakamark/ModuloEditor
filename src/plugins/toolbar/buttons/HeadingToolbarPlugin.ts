import {CommandButtonPlugin} from "../base";
import type {ButtonToolbarPluginOptions} from "../../contracts";

export class HeadingToolbarPlugin extends CommandButtonPlugin {
    public constructor(
        level: number,
        options: ButtonToolbarPluginOptions = {}
    ) {
        super({
            pluginName: `toolbar-heading-${level}`,
            commandName: `heading-${level}`,
            content: options.content ?? `H${level}`,
            shortcut: options.shortcut ?? `Ctrl+${level}`,
        });
    }
}