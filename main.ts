import '/src/style/reset.css';
import '/src/style/preset-default.css';

import {
    BoldToolbarPlugin,
    DefaultEditorDomInitializer,
    ItalicToolbarPlugin,
    ModuloEditorCore,
    StarterKitPreset,
} from "./src";
import {createSvgElement} from "./src";
import {HeadingDropdownPlugin, LinkToolbarPlugin} from "./src/plugins/toolbar";

ModuloEditorCore
    .create()
    .fromTextarea("#content")
    .withDomInitializer(new DefaultEditorDomInitializer())
    .usePreset(new StarterKitPreset())
    .withPlugins([
        new BoldToolbarPlugin({
            content: () => createSvgElement(`
        <svg xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none">
            <path
                d="M6 12V20H14.1C16.2539 20 18 18.2091 18 16C18 13.7909 16.2539 12 14.1 12H6ZM6 12H12.9C15.0539 12 16.8 10.2091 16.8 8C16.8 5.79086 15.0539 4 12.9 4H6V12Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
        `),
        }),
        new ItalicToolbarPlugin(),
        new HeadingDropdownPlugin(),
        new LinkToolbarPlugin(),
    ])
    .build()
    .init();