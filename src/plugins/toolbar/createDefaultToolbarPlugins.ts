import type {EditorPlugin} from "../contracts";
import {
    BoldToolbarPlugin,
    HeadingToolbarPlugin,
    ItalicToolbarPlugin
} from "./buttons";


export type ToolbarPresetOptions = {
    headings?: number[];
};

export function createDefaultToolbarPlugins(
    options: ToolbarPresetOptions = {}
): readonly EditorPlugin[] {
    const { headings = [1, 2, 3] } = options;

    return [
        new BoldToolbarPlugin(),
        new ItalicToolbarPlugin(),
        ...headings.map(level => new HeadingToolbarPlugin(level)),
    ];
}