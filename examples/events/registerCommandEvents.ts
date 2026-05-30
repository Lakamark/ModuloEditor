import { DemoEditorInstance } from "../DemoEditorInstance";

export function registerCommandEvents(): void {
    const editor = DemoEditorInstance.get();

    editor.on("command:execute", ({ name }) => {
        console.log("[ModuloEditor] Command executed:", name);
    });
}