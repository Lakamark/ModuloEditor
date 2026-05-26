/**
 * Creates an SVG element from a raw SVG string.
 */
export function createSvgElement(
    svg: string
): SVGElement {
    const template = document.createElement("template");

    template.innerHTML = svg.trim();

    return template.content.firstElementChild as SVGElement;
}