import type {EditorPluginApi} from "../../contracts";
import {EDITOR_DOM_ATTRIBUTES} from "../../../dom/constants";

/**
 * Creates a toolbar dropdown menu container.
 *
 * The menu is hidden by default and follows
 * the stable ModuloEditor dropdown DOM contract.
 *
 * @param api Editor plugin API.
 *
 * @returns Dropdown menu element.
 */
export function createToolbarDropdownMenu(
    api: EditorPluginApi
): HTMLDivElement {
    const menu = document.createElement("div");

    menu.className = api.classes.toolbarDropdownMenu;

    menu.hidden = true;

    menu.setAttribute(
        EDITOR_DOM_ATTRIBUTES.toolbarDropdownMenu,
        ""
    );

    return menu;
}