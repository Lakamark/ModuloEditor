import {CommandButtonPlugin} from "../base";

export class HeadingToolbarPlugin extends CommandButtonPlugin {
    public constructor(level: number) {
        super({
            pluginName: `toolbar-heading-${level}`,
            commandName: `heading-${level}`,
            content: `H${level}`,
        });
    }
}