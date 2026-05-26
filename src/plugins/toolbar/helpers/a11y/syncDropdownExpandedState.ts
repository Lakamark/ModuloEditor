/**
 * Synchronizes aria-expanded with menu visibility.
 *
 * @param button Trigger button element.
 * @param menu Dropdown menu element.
 */
export function syncDropdownExpandedState(
    button: HTMLButtonElement,
    menu: HTMLElement
): void {
    button.setAttribute(
        "aria-expanded",
        String(!menu.hidden)
    );
}