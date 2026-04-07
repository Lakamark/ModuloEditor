import type {EditorCommandsApi} from "../commands/EditorCommandsApi";

/**
 * Public API exposed to editor plugins.
 */
export interface EditorPluginApi {
    readonly commands: EditorCommandsApi;
}