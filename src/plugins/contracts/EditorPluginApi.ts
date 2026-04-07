import type {EditorCommandsApi} from "../../commands";

/**
 * Public API exposed to editor plugins.
 */
export interface EditorPluginApi {
    readonly commands: EditorCommandsApi;
}