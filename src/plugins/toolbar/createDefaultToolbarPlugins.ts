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
    toolbar: HTMLElement,
    options: ToolbarPresetOptions = {}
): readonly EditorPlugin[] {
    const { headings = [1, 2, 3] } = options;

    return [
        new BoldToolbarPlugin(toolbar),
        new ItalicToolbarPlugin(toolbar),
        ...headings.map(level => new HeadingToolbarPlugin(toolbar, level)),
    ];
}