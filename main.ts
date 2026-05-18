import '/src/style/reset.css';
import '/src/style/preset-default.css';

import {
    BoldToolbarPlugin,
    DefaultEditorDomInitializer,
    HeadingToolbarPlugin,ItalicToolbarPlugin,
    ModuloEditorBuilder,
    StarterKitPreset,
} from "./src";

ModuloEditorBuilder
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