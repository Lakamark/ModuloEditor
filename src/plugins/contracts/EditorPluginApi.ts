import type {EditorCommandsApi} from "../../commands";
import type {EditorDomSlots} from "../../dom";
import type {EditorCssClassMap} from "../../dom/contracts";

/**
 * Public API exposed to editor plugins.
 *
 * This API provides access to:
 *
 * - editor commands
 * - resolved DOM slots
 * - configured CSS class names
 * - command execution helpers
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
}