/**
 * Listener used by the editor event bus.
 *
 * @template Payload Event payload type.
 */
export type EditorEventListener<Payload> =
    (payload: Payload) => void;