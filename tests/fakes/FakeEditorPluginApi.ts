import type {EditorCommandsApi, EditorPluginApi} from "../../src";
import {vi} from "vitest";

export class FakeEditorPluginApi implements EditorPluginApi {
    public readonly commands: EditorCommandsApi = {
        execute: vi.fn(),
        has: vi.fn(() => true)
    }

    public readonly executeCommand = vi.fn();
}