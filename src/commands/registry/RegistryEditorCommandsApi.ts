import type {EditorCommandsApi} from "./EditorCommandsApi";
import type {EditorCommandRegistry} from "./EditorCommandRegistry";
import type {EditorCommandContext} from "../contracts";

/**
 * Adapter exposing registry commands as a public API.
 */
export class RegistryEditorCommandsApi implements EditorCommandsApi {
    private readonly registry: EditorCommandRegistry;
    private readonly contextResolver: () => EditorCommandContext;

    public constructor(
        registry: EditorCommandRegistry,
        contextResolver: () => EditorCommandContext
    ) {
        this.contextResolver = contextResolver;
        this.registry = registry;
    }

    /**
     * Executes a command.
     */
    public execute(name: string): void {
        const context = this.contextResolver();
        this.registry.execute(name, context);
    }

    /**
     * Checks if a command exists.
     */
    public has(name: string): boolean {
        return this.registry.has(name);
    }
}