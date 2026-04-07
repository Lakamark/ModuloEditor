import {CommandButtonPlugin} from "./toolbar/CommandButtonPlugin";

/**
 * Toolbar plugin rendering a button for the bold command.
 */
export class BoldToolbarPlugin extends CommandButtonPlugin {
    public constructor(container: HTMLElement) {
        super({
            pluginName: "toolbar-bold",
            commandName: "bold",
            content: "Bold",
            container
        });
    }
}