import './style.css';
import {
    ModuloEditor
} from "../src";
import {
    BoldToolbarPlugin,
    ItalicToolbarPlugin
} from "../src/plugins";
import {
    DefaultEditorPreset,
    SafeMarkdownPreset
} from "../src/presets";


ModuloEditor
    .create('[data-mo-editor]')
    .withPlugins([
        new BoldToolbarPlugin(),
        new ItalicToolbarPlugin()
    ])
    .usePreset(new DefaultEditorPreset())
    .usePreset(new SafeMarkdownPreset())
    .build();