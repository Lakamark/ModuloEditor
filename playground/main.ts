import './style.css';
import {
    ModuloEditor
} from "../src";
import {
    BoldToolbarPlugin, HeadingToolbarPlugin,
    ItalicToolbarPlugin
} from "../src/plugins";
import {StarterKitPreset} from "../src/presets";


ModuloEditor
    .create('[data-mo-editor]')
    .withPlugins([
        new BoldToolbarPlugin(),
        new ItalicToolbarPlugin(),
        new HeadingToolbarPlugin(1),
        new HeadingToolbarPlugin(2),
        new HeadingToolbarPlugin(3),
    ])
    .usePreset(new StarterKitPreset())
    .build()
    .init()