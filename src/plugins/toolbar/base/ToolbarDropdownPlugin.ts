import type {
    EditorPlugin,
    EditorPluginApi,
    ToolbarDropdownPluginOptions
} from "../../contracts";
import {
    applyDropdownTriggerA11y,
    applyToolbarButtonA11y,
    createToolbarButton,
    createToolbarDropdownMenu,
    createToolbarDropdownRoot,
    syncDropdownExpandedState
} from "../helpers";
import {EDITOR_DOM_ATTRIBUTES} from "../../../dom/constants";

/**
 * Generic toolbar dropdown plugin.
 *
 * This plugin creates a dropdown menu inside the editor toolbar
 * and executes commands when a dropdown item is selected.
 *
 * The plugin relies on the editor DOM contract through
 * stable data attributes and customizable CSS classes.
 *
 * DOM contract:
 *
 * - data-mo-toolbar-dropdown
 * - data-mo-toolbar-dropdown-trigger
 * - data-mo-toolbar-dropdown-menu
 * - data-mo-toolbar-dropdown-item
 */
export class ToolbarDropdownPlugin implements EditorPlugin {
    /**
     * Unique plugin name.
     */
    public readonly name: string;

    /**
     * Dropdown trigger label.
     */
    private readonly label: string;

    /**
     * Dropdown item definitions.
     */
    private readonly items: ToolbarDropdownPluginOptions["items"];

    /**
     * Root dropdown element.
     */
    private root: HTMLDivElement | null = null;

    /**
     * Creates a new toolbar dropdown plugin.
     *
     * @param options Plugin configuration.
     */
    public constructor(options: ToolbarDropdownPluginOptions) {
        this.name = options.pluginName;
        this.label = options.label;
        this.items = options.items;
    }

    /**
     * Mounts the dropdown into the editor toolbar.
     *
     * @param api Editor plugin API.
     */
    public setup(api: EditorPluginApi): void {
        const toolbar = api.slots.toolbar;

        if (!toolbar) {
            return;
        }


        const root = createToolbarDropdownRoot(api);

        const button = createToolbarButton(
            api,
            this.label,
            api.classes.toolbarDropdownTrigger,
            EDITOR_DOM_ATTRIBUTES.toolbarDropdownTrigger
        );

        applyToolbarButtonA11y(button, this.label);
        applyDropdownTriggerA11y(button, this.label);


        const menu = createToolbarDropdownMenu(api);
        menu.setAttribute("role", "menu");

        button.addEventListener("click", (): void => {
            menu.hidden = !menu.hidden;

            syncDropdownExpandedState(button, menu);
        });

        for (const item of this.items) {
            const itemButton = createToolbarButton(
                api,
                item.label,
                api.classes.toolbarDropdownItem,
                EDITOR_DOM_ATTRIBUTES.toolbarDropdownItem
            );

            itemButton.setAttribute("role", "menuitem");

            itemButton.addEventListener("click", (): void => {
                if (!api.commands.has(item.commandName)) {
                    return;
                }

                api.executeCommand(item.commandName);

                menu.hidden = true;

                syncDropdownExpandedState(button, menu);
            });

            menu.appendChild(itemButton);
        }

        root.append(button, menu);
        toolbar.appendChild(root);

        this.root = root;
    }

    /**
     * Removes the dropdown from the DOM.
     */
    public destroy(): void {
        this.root?.remove();

        this.root = null;
    }
}