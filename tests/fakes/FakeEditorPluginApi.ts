import type {
    EditorCommandsApi,
    EditorEventMap,
    EditorPluginApi
} from "../../src";
import type {EditorDomSlots} from "../../src";
import {EDITOR_CSS_CLASSES} from "../../src/dom/constants";

import {
    type EditorEventBus,
    SimpleEditorEventBus
} from "../../src";

/**
 * Mutable version of EditorDomSlots used for testing.
 * Removes readonly modifiers to allow slot overrides.
 */
type MutableEditorDomSlots = {
    -readonly [K in keyof EditorDomSlots]: EditorDomSlots[K];
};

export class FakeEditorPluginApi implements EditorPluginApi {
    public classes = EDITOR_CSS_CLASSES;

    public commands: EditorCommandsApi  = {
        has: vi.fn(() => true),
        execute: vi.fn(() => true),
    };

    public events: EditorEventBus<EditorEventMap> =
        new SimpleEditorEventBus<EditorEventMap>();

    public executeCommand = vi.fn();


    public slots: MutableEditorDomSlots = {
        root: document.createElement("div"),
        header: null,
        toolbar: document.createElement("div"),
        body: null,
        input: document.createElement("div"),
        preview: document.createElement("div"),
        footer:  document.createElement("div"),
        status:  document.createElement("div"),
        textarea: document.createElement("textarea"),
    };
}