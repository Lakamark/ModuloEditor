import '/src/style/modulo-editor.css';
import {
    BoldToolbarPlugin,
    DefaultEditorDomInitializer,
    HeadingToolbarPlugin,ItalicToolbarPlugin,
    ModuloEditor,
    StarterKitPreset,
} from "./src";
ModuloEditor
    .create()
    .fromTextarea("#content")
    .withDomInitializer(new DefaultEditorDomInitializer())
    .usePreset(new StarterKitPreset())
    .withPlugins([
        new BoldToolbarPlugin(),
        new ItalicToolbarPlugin(),
        new HeadingToolbarPlugin(1),
        new HeadingToolbarPlugin(2),
        new HeadingToolbarPlugin(3),
    ])
    .build()
    .init();