import type {
    EditorPlugin,
    EditorPluginApi,
    ToolbarDropdownPluginOptions
} from "../../contracts";

export class ToolbarDropdownPlugin implements EditorPlugin {
    public readonly name: string;

    private readonly label: string;
    private readonly items: ToolbarDropdownPluginOptions["items"];

    private root: HTMLDivElement | null = null;
    private api: EditorPluginApi | null = null;

    public constructor(options: ToolbarDropdownPluginOptions) {
        this.name = options.pluginName;
        this.label = options.label;
        this.items = options.items;
    }

    public setup(api: EditorPluginApi): void {
        const toolbar = api.slots.toolbar;

        if (!toolbar) {
            return;
        }

        this.api = api;

        const root = document.createElement("div");
        root.className = "mo-toolbar-dropdown";

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = this.label;

        const menu = document.createElement("div");
        menu.className = "mo-toolbar-dropdown__menu";
        menu.hidden = true;

        button.addEventListener("click", () => {
            menu.hidden = !menu.hidden;
        });

        for (const item of this.items) {
            const itemButton = document.createElement("button");
            itemButton.type = "button";
            itemButton.textContent = item.label;

            itemButton.addEventListener("click", () => {
                if (!this.api?.commands.has(item.commandName)) {
                    return;
                }

                this.api.executeCommand(item.commandName);
                menu.hidden = true;
            });

            menu.appendChild(itemButton);
        }

        root.appendChild(button);
        root.appendChild(menu);

        toolbar.appendChild(root);
        this.root = root;
    }

    public destroy(): void {
        this.root?.remove();
        this.root = null;
        this.api = null;
    }
}