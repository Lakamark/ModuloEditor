import './style.css';
import {
    ModuloEditor
} from "../src";
import {
    BoldToolbarPlugin,
    ItalicToolbarPlugin
} from "../src/plugins";


ModuloEditor
    .create('[data-mo-editor]')
    .use(
        new BoldToolbarPlugin(),
        new BoldToolbarPlugin(),
        new ItalicToolbarPlugin()
    )
    .init()