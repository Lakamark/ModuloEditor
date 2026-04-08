import {CommandButtonPlugin} from "../base";

export class ItalicToolbarPlugin extends CommandButtonPlugin {
    public constructor() {
        super({
            pluginName: "toolbar-italic",
            commandName: "italic",
            content: "Italic",
        });
    }
}