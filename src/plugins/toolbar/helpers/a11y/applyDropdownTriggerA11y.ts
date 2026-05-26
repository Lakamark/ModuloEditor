/**
 * Applies accessible dropdown trigger attributes.
 *
 * @param button Trigger button element.
 * @param label Accessible label.
 */
export function applyDropdownTriggerA11y(
    button: HTMLButtonElement,
    label: string
): void {
    button.setAttribute("aria-haspopup", "menu");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", label);
}