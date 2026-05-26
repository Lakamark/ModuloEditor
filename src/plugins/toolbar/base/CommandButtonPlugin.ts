import type {
    EditorPlugin,
    EditorPluginApi,
    ToolbarContent
} from "../../contracts";
import type {CommandButtonPluginOptions} from "./CommandButtonPluginOptions";

/**
 * Generic toolbar plugin responsible for rendering
 * a button that executes a command.
 */
export class CommandButtonPlugin implements EditorPlugin {
    public readonly name: string;

    private readonly commandName: string;
    private readonly content: ToolbarContent;
    private readonly shortcut?: string;

    private button: HTMLButtonElement | null = null;
    private api: EditorPluginApi | null = null;

    public constructor(options: CommandButtonPluginOptions) {
        this.name = options.pluginName;
        this.commandName = options.commandName;
        this.content = options.content;
        this.shortcut = options.shortcut;
    }

    /**
     * Mounts the button and binds click interaction.
     */
    public setup(api: EditorPluginApi):void {
        const toolbar = api.slots.toolbar;

        if (!toolbar) {
            return;
        }

        this.api = api;

        const button = document.createElement("button");
        button.type = "button";

        this.renderButtonContent(button);

        button.addEventListener("click", this.handleClick);

        if (this.shortcut) {
            document.addEventListener("keydown", this.handleShortcut);
        }

       toolbar.appendChild(button);
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

        if (this.shortcut) {
            document.removeEventListener(
                "keydown",
                this.handleShortcut
            );
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

    private readonly handleShortcut =(event: KeyboardEvent): void => {
        if (!this.shortcut) {
            return;
        }

        if (!this.matchesShortcut(event, this.shortcut)) {
            return;
        }

        event.preventDefault();

        this.api?.executeCommand(this.commandName);
    }

    /**
     * Checks whether the keyboard event matches
     * the configured shortcut string.
     */
    private matchesShortcut(
        event: KeyboardEvent,
        shortcut: string
    ): boolean {
        const parts: string[] = shortcut
            .toLowerCase()
            .split("+");

        const key = parts[parts.length - 1];

        const requiresCtrl = parts.includes("ctrl");
        const requiresMeta = parts.includes("meta");
        const requiresShift = parts.includes("shift");
        const requiresAlt = parts.includes("alt");

        return (
            event.key.toLowerCase() === key &&
            event.ctrlKey === requiresCtrl &&
            event.metaKey === requiresMeta &&
            event.shiftKey === requiresShift &&
            event.altKey === requiresAlt
        );
    }
}