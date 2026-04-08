import type {EditorDomSlots} from "./EditorDomSlots";

/**
 * Resolves editor DOM slots from a root element.
 *
 * Implementations are responsible for locating the required
 * editor containers using data attributes.
 *
 * This abstraction allows users to provide custom HTML
 * structures while keeping the editor core decoupled from DOM.
 */
export interface EditorDomResolver {
    /**
     * Resolves all editor DOM slots from the given root element.
     *
     * @param root - Root editor element
     * @throws Error if required slots are missing
     */
    resolve(root: HTMLElement): EditorDomSlots;
}