import type {EditorCommand} from "./EditorCommand";
import type {EditorCommandContext} from "./EditorCommandContext";

/**
 * Registry responsible for storing and executing editor commands.
 */
export class EditorCommandRegistry {
    private readonly commands = new Map<string, EditorCommand>();

    /**
     * Registers a command in the registry.
     */
    public register(command: EditorCommand): void {
        if (this.commands.has(command.name)) {
            throw new Error(`Editor command "${command.name}" is already registered.`);
        }

        this.commands.set(command.name, command);
    }

    /**
     * Returns a registered command by name.
     */
    public get(name: string): EditorCommand | undefined {
        return this.commands.get(name);
    }

    /**
     * Returns whether a command exists.
     */
    public has(name: string): boolean {
        return this.commands.has(name);
    }

    /**
     * Returns all registered commands.
     */
    public all(): readonly EditorCommand[] {
        return Array.from(this.commands.values());
    }

    /**
     * Executes a registered command.
     */
    public execute(name: string, context: EditorCommandContext): void {
        const command:EditorCommand | undefined = this.get(name);

        if (!command) {
            throw new Error(`Unknown editor command "${name}".`);
        }

        command.execute(context);
    }
}