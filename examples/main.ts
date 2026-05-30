import '/src/style/reset.css';
import '/src/style/preset-default.css';

import {
    BoldToolbarPlugin,
    DefaultEditorDomInitializer,
    HeadingDropdownPlugin,
    ItalicToolbarPlugin,
    LinkToolbarPlugin,
    ModuloEditorCore,
    StarterKitPreset,
    WordCountStatusAdapter
} from "../src";

import {DemoEditorInstance} from "./DemoEditorInstance";
import {registerDemoUpload} from "./upload/uploadFile";
import {DemoImageUploadToolbarPlugin} from "./plugins/DemoImageUploadToolbarPlugin";


const editor = ModuloEditorCore
    .create()
    .fromTextarea("#content")
    .withDomInitializer(new DefaultEditorDomInitializer())
    .usePreset(new StarterKitPreset())
    .withPlugins([
        new BoldToolbarPlugin(),
        new ItalicToolbarPlugin(),
        new HeadingDropdownPlugin(),
        new LinkToolbarPlugin(),
        new DemoImageUploadToolbarPlugin()
    ])
    .withStatus(new WordCountStatusAdapter())
    .build();

DemoEditorInstance.set(editor);

registerDemoUpload();

editor.on("asset:upload-success", ({ file, url }) => {
    const markdown = `![${file.name}](${url})`;

    console.log("Inserted:", markdown);

    // Insert the value in the editor.
});

editor.init()