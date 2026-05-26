/**
 * Toolbar renderable content.
 */
export type ToolbarContent =
    | string
    | HTMLElement
    | SVGElement
    | (() => HTMLElement | SVGElement);