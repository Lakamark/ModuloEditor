import type {ToolbarDropdownItem} from "./ToolbarDropdownItem";

export interface ToolbarDropdownPluginOptions {
    readonly pluginName: string;
    readonly label: string;
    readonly items: readonly ToolbarDropdownItem[];
}