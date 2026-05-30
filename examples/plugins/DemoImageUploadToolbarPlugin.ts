import type {EditorPlugin, EditorPluginApi} from "../../src";

/**
 * Toolbar plugin used to request image uploads.
 *
 * When a user selects a file, the plugin emits the
 * `asset:upload-request` event through the editor
 * event system.
 *
 * This plugin does not upload files directly.
 * Applications are responsible for listening to
 * upload events and integrating with their own
 * storage provider.
 *
 * Example:
 *
 * editor.on('asset:upload-request', async ({ file }) => {
 *     const url = await uploadFile(file);
 *
 *     editor.emit('asset:upload-success', {
 *         file,
 *         url,
 *     });
 * });
 */
export class DemoImageUploadToolbarPlugin implements EditorPlugin {
    /**
     * Unique plugin name.
     */
    public readonly name = "demo-toolbar-image-upload";

    private button: HTMLButtonElement | null = null;
    private input: HTMLInputElement | null = null;
    private api: EditorPluginApi | null = null;

    public setup(api: EditorPluginApi): void {
        const toolbar = api.slots.toolbar;

        if (!toolbar) {
            return;
        }

        this.api = api;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Image";

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.hidden = true;

        button.addEventListener("click", this.handleClick);
        input.addEventListener("change", this.handleChange);

        toolbar.appendChild(button);
        toolbar.appendChild(input);

        this.button = button;
        this.input = input;
    }

    public destroy(): void {
        this.button?.removeEventListener("click", this.handleClick);
        this.input?.removeEventListener("change", this.handleChange);

        this.button?.remove();
        this.input?.remove();

        this.button = null;
        this.input = null;
        this.api = null;
    }

    private readonly handleClick = (): void => {
        this.input?.click();
    };

    /**
     * Emits an upload request when a file is selected.
     */
    private readonly handleChange = (): void => {
        const file = this.input?.files?.[0];

        if (!file) {
            return;
        }

        this.api?.emit("asset:upload-request", {
            file,
        });

        if (this.input) {
            this.input.value = "";
        }
    };
}