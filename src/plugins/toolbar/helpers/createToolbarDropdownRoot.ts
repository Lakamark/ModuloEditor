import type {EditorPluginApi} from "../../contracts";
import {EDITOR_DOM_ATTRIBUTES} from "../../../dom/constants";

/**
 * Creates a toolbar dropdown root container.
 *
 * The generated element follows the stable
 * ModuloEditor dropdown DOM contract.
 *
 * @param api Editor plugin API.
 *
 * @returns Dropdown root element.
 */
export function createToolbarDropdownRoot(
    api: EditorPluginApi
): HTMLDivElement  {
    const root = document.createElement("div");

    root.className = api.classes.toolbarDropdown;

    root.setAttribute(
        EDITOR_DOM_ATTRIBUTES.toolbarDropdown,
        ""
    );

    return root;
}