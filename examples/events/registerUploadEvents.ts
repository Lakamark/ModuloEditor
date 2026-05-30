import {DemoEditorInstance} from "../DemoEditorInstance";

export function registerUploadEvents() {
    const editor = DemoEditorInstance.get();

    editor.on("asset:upload-success", ({ file, url }) => {
        const markdown = `![${file.name}](${url})`;

        console.log("Inserted:", markdown);

        editor.insertContent(markdown);

        console.log(editor.getValue());
    });

    editor.init();
}