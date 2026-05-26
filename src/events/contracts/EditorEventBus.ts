import type {EditorEventListener} from "./EditorEventListener";
import type {EditorEventUnsubscribe} from "./EditorEventUnsubscribe";

/**
 * Generic editor event bus contract.
 *
 * @template EventMap Event payload registry.
 */
export interface EditorEventBus<
    EventMap extends object
> {
    /**
     * Subscribe to an event.
     *
     * Returns a cleanup function.
     */
    on<EventName extends keyof EventMap>(
        event: EventName,
        listener: EditorEventListener<EventMap[EventName]>
    ): EditorEventUnsubscribe;

    /**
     * Emit an event.
     */
    emit<EventName extends keyof EventMap>(
        event: EventName,
        payload: EventMap[EventName]
    ): void;

    /**
     * Remove all listeners.
     */
    clear(): void;
}