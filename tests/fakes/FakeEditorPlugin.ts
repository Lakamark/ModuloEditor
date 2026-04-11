import type {
    EditorPlugin,
    EditorPluginApi
} from "../../src";

export class FakeEditorPlugin implements EditorPlugin {
    public readonly name: string;
    public setupCalled = false;
    public destroyCalled = false;
    public receivedApi: EditorPluginApi | null = null;
    public setupCalls: number = 0;

    public constructor(name = "fake-plugin") {
        this.name = name;
    }

    public setup(api: EditorPluginApi): void {
        this.setupCalled = true;
        this.receivedApi = api;
        this.setupCalls += 1;
    }

    public destroy(): void {
        this.destroyCalled = true;
    }
}