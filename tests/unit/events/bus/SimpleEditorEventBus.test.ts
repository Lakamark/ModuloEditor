import { describe, expect, it, vi } from 'vitest';
import {SimpleEditorEventBus} from "../../../../src";

interface TestEventMap {
    'editor:init': void;

    'content:change': {
        readonly value: string;
    };
}

describe('SimpleEditorEventBus', () => {
    it('registers and emits an event listener', () => {
        const bus = new SimpleEditorEventBus<TestEventMap>();
        const listener = vi.fn();

        bus.on('content:change', listener);

        bus.emit('content:change', {
            value: 'Hello',
        });

        expect(listener).toHaveBeenCalledOnce();
        expect(listener).toHaveBeenCalledWith({
            value: 'Hello',
        });
    });

    it('supports void payload events', () => {
        const bus = new SimpleEditorEventBus<TestEventMap>();
        const listener = vi.fn();

        bus.on('editor:init', listener);
        bus.emit('editor:init', undefined);

        expect(listener).toHaveBeenCalledOnce();
        expect(listener).toHaveBeenCalledWith(undefined);
    });

    it('unsubscribes a listener', () => {
        const bus = new SimpleEditorEventBus<TestEventMap>();
        const listener = vi.fn();

        const unsubscribe = bus.on('content:change', listener);

        unsubscribe();

        bus.emit('content:change', {
            value: 'Ignored',
        });

        expect(listener).not.toHaveBeenCalled();
    });

    it('notifies multiple listeners for the same event', () => {
        const bus = new SimpleEditorEventBus<TestEventMap>();

        const first = vi.fn();
        const second = vi.fn();

        bus.on('content:change', first);
        bus.on('content:change', second);

        bus.emit('content:change', {
            value: 'Hello',
        });

        expect(first).toHaveBeenCalledOnce();
        expect(second).toHaveBeenCalledOnce();
    });

    it('does not notify listeners from another event', () => {
        const bus = new SimpleEditorEventBus<TestEventMap>();

        const initListener = vi.fn();
        const changeListener = vi.fn();

        bus.on('editor:init', initListener);
        bus.on('content:change', changeListener);

        bus.emit('editor:init', undefined);

        expect(initListener).toHaveBeenCalledOnce();
        expect(changeListener).not.toHaveBeenCalled();
    });

    it('clears all listeners', () => {
        const bus = new SimpleEditorEventBus<TestEventMap>();

        const listener = vi.fn();

        bus.on('content:change', listener);

        bus.clear();

        bus.emit('content:change', {
            value: 'Ignored',
        });

        expect(listener).not.toHaveBeenCalled();
    });
});