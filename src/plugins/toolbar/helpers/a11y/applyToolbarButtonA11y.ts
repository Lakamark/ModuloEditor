/**
 * Applies accessible button attributes.
 *
 * @param button Target button element.
 * @param label Accessible label.
 */
export function applyToolbarButtonA11y(
    button: HTMLButtonElement,
    label: string
): void {
    button.setAttribute("aria-label", label);
}