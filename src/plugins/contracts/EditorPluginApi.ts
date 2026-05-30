import type {EditorCommandsApi} from "../../commands";
import type {EditorDomSlots} from "../../dom";
import type {EditorCssClassMap} from "../../dom/contracts";
import type {EditorEventMap} from "../../events";

/**
 * Public API exposed to editor plugins.
 *
 * This API provides access to:
 *
 * - editor commands
 * - resolved DOM slots
 * - configured CSS class names
 * - command execution helpers
 * - event publishing and subscription
 *
 * Plugins should rely on this API instead of
 * accessing editor internals directly.
 */
export interface EditorPluginApi {
    /**
     * Registered editor command API.
     */
    readonly commands: EditorCommandsApi;

    /**
     * Resolved editor DOM slots.
     *
     * These slots follow the stable ModuloEditor
     * DOM contract.
     */
    readonly slots: EditorDomSlots;

    /**
     * Resolved editor CSS class map.
     *
     * Plugins should use these classes instead of
     * hardcoded class names to support customization.
     */
    readonly classes: Required<EditorCssClassMap>;

    /**
     * Executes a registered editor command.
     *
     * @param name Command name.
     */
    executeCommand(name: string): void;

    /**
     * Emits an editor event.
     *
     * This allows plugins to publish events through the
     * editor event bus and communicate with external
     * application code.
     *
     * @param event Event name.
     * @param payload Event payload.
     */
    emit<K extends keyof EditorEventMap>(
        event: K,
        payload: EditorEventMap[K]
    ): void;

    /**
     * Subscribes to an editor event.
     *
     * Plugins can use this method to react to editor events
     * emitted by the core, other plugins, or the host application.
     *
     * The returned function must be called during plugin cleanup
     * to remove the listener.
     *
     * @param event Event name to listen to.
     * @param listener Listener called when the event is emitted.
     * @returns Function used to unsubscribe the listener.
     */
    on<K extends keyof EditorEventMap>(
        event: K,
        listener: (payload: EditorEventMap[K]) => void
    ): () => void;
}