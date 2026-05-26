import type {EditorCommandsApi} from "../../commands";
import type {EditorDomSlots} from "../../dom";

/**
 * Public API exposed to editor plugins.
 */
export interface EditorPluginApi {
    readonly commands: EditorCommandsApi;
    readonly slots: EditorDomSlots;
    executeCommand(name: string): void;
}