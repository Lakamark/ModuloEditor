import { DemoEditorInstance } from "../DemoEditorInstance";

export function registerContentEvents(): void {
    const editor = DemoEditorInstance.get();

    editor.on("content:change", ({ value, html, source }) => {
        console.log("[ModuloEditor] Content changed", {
            value,
            html,
            source,
        });
    });
}