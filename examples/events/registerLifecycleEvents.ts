import { DemoEditorInstance } from "../DemoEditorInstance";

export function registerLifecycleEvents(): void {
    const editor = DemoEditorInstance.get();

    editor.on("editor:init", () => {
        console.log("[ModuloEditor] Ready", editor);
    });

    editor.on("editor:destroy", () => {
        console.log("[ModuloEditor] Destroyed");
    });
}