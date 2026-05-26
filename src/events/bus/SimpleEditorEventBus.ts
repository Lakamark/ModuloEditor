import type {
    EditorEventBus,
    EditorEventListener,
    EditorEventUnsubscribe
} from "../contracts";

/**
 * Default in-memory implementation of the editor event bus.
 *
 * SimpleEditorEventBus provides a lightweight publish/subscribe
 * system used internally by ModuloEditor.
 *
 * Responsibilities:
 *
 * - register event listeners
 * - emit typed events
 * - unsubscribe listeners
 * - clear all listeners during editor destruction
 *
 * This implementation is scoped to a single editor instance.
 * It should not be shared globally across multiple editors.
 *
 * @template EventMap Map of event names and payload contracts.
 */
export class SimpleEditorEventBus<
    EventMap extends object
> implements EditorEventBus<EventMap> {

    /**
     * Internal event listener registry.
     *
     * Each event key stores a set of listeners associated
     * with that event.
     */
    private readonly listeners = new Map<
        keyof EventMap,
        Set<EditorEventListener<EventMap[keyof EventMap]>>
    >();

    /**
     * Registers a listener for a specific event.
     *
     * Returns a cleanup function that removes the listener.
     *
     * @template EventName Event name.
     *
     * @param event Event to subscribe to.
     * @param listener Event listener callback.
     *
     * @returns Unsubscribe callback.
     */
    public on<EventName extends keyof EventMap>(
        event: EventName,
        listener: EditorEventListener<EventMap[EventName]>
    ): EditorEventUnsubscribe {
        const listeners = this.listeners.get(event) ?? new Set();

        listeners.add(
            listener as EditorEventListener<EventMap[keyof EventMap]>
        );

        this.listeners.set(event, listeners);

        return () => {
            listeners.delete(
                listener as EditorEventListener<EventMap[keyof EventMap]>
            );
        };
    }

    /**
     * Emits an event to all registered listeners.
     *
     * Listeners are executed synchronously in registration order.
     *
     * @template EventName Event name.
     *
     * @param event Event name.
     * @param payload Event payload.
     */
    public emit<EventName extends keyof EventMap>(
        event: EventName,
        payload: EventMap[EventName]
    ): void {
        this.listeners.get(event)?.forEach((listener) => {
            listener(payload);
        });
    }

    /**
     * Removes all registered listeners from the bus.
     *
     * Typically called during editor destruction
     * to prevent memory leaks.
     */
    public clear(): void {
        this.listeners.clear();
    }
}