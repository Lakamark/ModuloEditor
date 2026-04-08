import type {
    EditorPlugin,
    EditorPluginApi
} from "../../src";

export class SpyToolbarPlugin implements EditorPlugin {
    public readonly name = 'spy-toolbar-plugin';
    public setupCalled = false;

    public setup(api: EditorPluginApi): void {
        this.setupCalled = true;

        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = 'Spy';

        api.slots.toolbar?.append(button);
    }

    public destroy(): void {}
}