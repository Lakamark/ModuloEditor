import type {EditorPluginApi} from "../../contracts";
import {EDITOR_DOM_ATTRIBUTES} from "../../../dom/constants";

/**
 * Creates a standardized toolbar button.
 *
 * This helper applies:
 *
 * - the shared toolbar button CSS class
 * - optional extra CSS classes
 * - the stable toolbar button DOM attribute
 * - an optional custom DOM attribute
 *
 * The generated button follows the ModuloEditor
 * toolbar DOM contract.
 *
 * @param api Editor plugin API.
 * @param label Button label.
 * @param extraClassName Optional additional CSS class.
 * @param extraAttribute Optional additional DOM attribute.
 *
 * @returns Configured toolbar button element.
 */
export function createToolbarButton(
    api: EditorPluginApi,
    label = "",
    extraClassName?: string,
    extraAttribute?: string
): HTMLButtonElement {
    const button = document.createElement("button");

    button.type = "button";

    if (label !== "") {
        button.textContent = label;
    }

    button.className = [
        api.classes.toolbarButton,
        extraClassName,
    ].filter(Boolean).join(" ");

    button.setAttribute(EDITOR_DOM_ATTRIBUTES.toolbarButton, "");

    if (extraAttribute) {
        button.setAttribute(extraAttribute, "");
    }

    return button;
}