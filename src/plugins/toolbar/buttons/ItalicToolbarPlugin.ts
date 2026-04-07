import {CommandButtonPlugin} from "../base";

export class ItalicToolbarPlugin extends CommandButtonPlugin {
    public constructor(container: HTMLElement) {
        super({
            pluginName: "toolbar-italic",
            commandName: "italic",
            content: "Italic",
            container
        });
    }
}