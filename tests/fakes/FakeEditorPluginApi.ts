import type {EditorCommandsApi, EditorPluginApi} from "../../src";
import type {EditorDomSlots} from "../../src/dom/contracts";

/**
 * Mutable version of EditorDomSlots used for testing.
 * Removes readonly modifiers to allow slot overrides.
 */
type MutableEditorDomSlots = {
    -readonly [K in keyof EditorDomSlots]: EditorDomSlots[K];
};

export class FakeEditorPluginApi implements EditorPluginApi {
    public commands: EditorCommandsApi  = {
        has: vi.fn(() => true),
        execute: vi.fn(() => true),
    };

    public executeCommand = vi.fn();

    public slots: MutableEditorDomSlots = {
        root: document.createElement("div"),
        header: null,
        toolbar: document.createElement("div"),
        body: null,
        input: document.createElement("div"),
        preview: document.createElement("div"),
        footer: null,
        status: null,
        textarea: document.createElement("textarea"),
    };
}