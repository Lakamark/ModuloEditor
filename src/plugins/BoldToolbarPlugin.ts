import type {EditorPlugin} from "./EditorPlugin";
import type {EditorPluginApi} from "./EditorPluginApi";

export class BoldToolbarPlugin implements EditorPlugin {
    public readonly name = "toolbar-bold";

    private readonly container: HTMLElement;
    private button: HTMLButtonElement | null = null;
    private api: EditorPluginApi | null = null;

    public constructor(container: HTMLElement) {
        this.container = container;
    }
    public setup(api: EditorPluginApi):void {
        this.api = api;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Bold";
        this.container.appendChild(button);

        button.addEventListener("click", this.handleClick);

        this.container.appendChild(button);
        this.button = button;
    }

    public destroy():void {
        if (this.button) {
            this.button.removeEventListener("click", this.handleClick);
            this.button.remove();
            this.button = null;
        }

        this.api = null;
    }

    private readonly handleClick = (): void => {
       if (!this.api?.commands.has("bold")) {
           return;
       }

       this.api.commands.execute("bold");
    };
}