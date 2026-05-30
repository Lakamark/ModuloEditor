import {ModuloEditor} from "../src/core";

export class DemoEditorInstance {
    private static editor: ModuloEditor | null = null;

    public static set(editor: ModuloEditor): void {
        this.editor = editor;
    }

    public static get(): ModuloEditor {
        if (!this.editor) {
            throw new Error(
                "ModuloEditor instance has not been initialized."
            );
        }

        return this.editor;
    }
}