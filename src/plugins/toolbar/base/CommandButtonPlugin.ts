import type {
    EditorPlugin,
    EditorPluginApi
} from "../../contracts";
import type {CommandButtonPluginOptions} from "./CommandButtonPluginOptions";

/**
 * Generic toolbar plugin responsible for rendering
 * a button that executes a command.
 */
export class CommandButtonPlugin implements EditorPlugin {
    public readonly name: string;

    private readonly commandName: string;
    private readonly content: string | HTMLElement | (() => HTMLElement);
    private readonly container: HTMLElement;

    private button: HTMLButtonElement | null = null;
    private api: EditorPluginApi | null = null;

    public constructor(options: CommandButtonPluginOptions) {
        this.name = options.pluginName;
        this.commandName = options.commandName;
        this.content = options.content;
        this.container = options.container;
    }

    /**
     * Mounts the button and binds click interaction.
     */
    public setup(api: EditorPluginApi):void {
        this.api = api;

        const button = document.createElement("button");
        button.type = "button";

        this.renderButtonContent(button);

        button.addEventListener("click", this.handleClick);

        this.container.appendChild(button);
        this.button = button;
    }

    /**
     * Removes the button and cleans up listeners.
     */
    public destroy(): void {
        if (this.button) {
            this.button.removeEventListener("click", this.handleClick);
            this.button.remove();
            this.button = null;
        }

        this.api = null;
    }

    /**
     * Renders the configured button content.
     */
    private renderButtonContent(button: HTMLButtonElement): void {
        const content =
            typeof this.content === "function"
                ? this.content()
                : this.content;

        if (typeof content === "string") {
            button.textContent = content;

            return;
        }

        button.appendChild(content);
    }

    /**
     * Executes the configured command when available.
     */
    private readonly handleClick = (): void => {
        if (!this.api?.commands.has(this.commandName)) {
            return;
        }

        this.api.executeCommand(this.commandName);
    };
}