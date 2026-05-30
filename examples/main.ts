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
import {DemoImageUploadToolbarPlugin, DemoToolbarAdvancedPlugin} from "./plugins";
import {registerDemoUpload} from "./upload/uploadFile";
import {
    registerCommandEvents,
    registerContentEvents,
    registerLifecycleEvents
} from "./events";


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
        new DemoImageUploadToolbarPlugin(),
        new DemoToolbarAdvancedPlugin()
    ])
    .withStatus(new WordCountStatusAdapter())
    .build();

DemoEditorInstance.set(editor);


registerLifecycleEvents();
registerContentEvents();
registerCommandEvents();
registerDemoUpload();

editor.init();