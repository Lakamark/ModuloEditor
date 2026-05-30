import type {
    EditorPlugin,
    EditorPluginApi
} from "../../src";

/**
 * Demo plugin that adds a toolbar button used to
 * trigger editor events during development.
 *
 * This plugin is intended for debugging and
 * documentation examples.
 */
export class DemoToolbarAdvancedPlugin implements EditorPlugin {
    /**
     * Unique plugin identifier.
     */
    public readonly name = "demo-toolbar-advanced";

    private button?: HTMLButtonElement;


    /**
     * Registers the demo toolbar button.
     */
    public setup(api: EditorPluginApi): void {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = "Trigger Upload Error";

        button.addEventListener("click", () => {
            api.emit("asset:upload-error", {
                file: new File([], "demo.txt"),
                error: new Error("Demo error"),
            });
        });

        api.slots.toolbar?.appendChild(button);

        this.button = button;
    }

    /**
     * Removes the demo button from the toolbar.
     */
    public destroy(): void {
        this.button?.remove();
        this.button = undefined;
    }
}