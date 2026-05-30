import {DemoEditorInstance} from "../DemoEditorInstance";

/**
 * Demo upload helper.
 *
 * This function simulates an upload process and returns
 * a public image URL.
 *
 * Replace this implementation with your own backend,
 * storage provider, or upload workflow.
 */
export async function uploadFile(file: File): Promise<string> {
    console.log("Uploading:", file.name);

    // Simulate upload latency.
    await new Promise((resolve) => {
        window.setTimeout(resolve, 500);
    });

    return "https://placehold.co/600x400?text=ModuloEditor";
}

export function registerDemoUpload(): () => void {
    const editor = DemoEditorInstance.get();

    return editor.on("asset:upload-request", async ({ file }) => {
        try {
            const url = await uploadFile(file);

            editor.emit("asset:upload-success", {
                file,
                url,
            });
        } catch (error) {
            editor.emit("asset:upload-error", {
                file,
                error,
            });
        }
    });
}