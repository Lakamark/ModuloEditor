import {ToolbarDropdownPlugin} from "../base";

export class HeadingDropdownPlugin extends ToolbarDropdownPlugin {
    public constructor() {
        super({
            pluginName: "toolbar-heading",
            label: "Heading",
            items: [
                { label: "H1", commandName: "heading-1", shortcut: "Ctrl+1" },
                { label: "H2", commandName: "heading-2", shortcut: "Ctrl+2" },
                { label: "H3", commandName: "heading-3", shortcut: "Ctrl+3" },
                { label: "H4", commandName: "heading-4", shortcut: "Ctrl+4" },
            ],
        });
    }
}