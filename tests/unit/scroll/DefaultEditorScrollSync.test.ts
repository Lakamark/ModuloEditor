import { describe, expect, it, vi } from 'vitest';
import {DefaultEditorScrollSync} from "../../../src/scroll";

function defineScrollMetrics(
    element: HTMLElement,
    metrics: {
        scrollHeight: number;
        clientHeight: number;
        offsetTop?: number;
    }
): void {
    Object.defineProperty(element, 'scrollHeight', {
        configurable: true,
        value: metrics.scrollHeight,
    });

    Object.defineProperty(element, 'clientHeight', {
        configurable: true,
        value: metrics.clientHeight,
    });

    if (metrics.offsetTop !== undefined) {
        Object.defineProperty(element, 'offsetTop', {
            configurable: true,
            value: metrics.offsetTop,
        });
    }
}

describe('DefaultEditorScrollSync', () => {
    it('syncs target scrollTop using global scroll ratio', () => {
        const source = document.createElement('div');
        const target = document.createElement('div');

        defineScrollMetrics(source, {
            scrollHeight: 1000,
            clientHeight: 500,
        });

        defineScrollMetrics(target, {
            scrollHeight: 2000,
            clientHeight: 1000,
        });

        source.scrollTop = 250;

        const sync = new DefaultEditorScrollSync();
        sync.mount(source, target);

        source.dispatchEvent(new Event('scroll'));

        expect(target.scrollTop).toBe(500);
    });

    it('uses preview scroll sections when available', () => {
        const source = document.createElement('div');
        const target = document.createElement('div');
        const section = document.createElement('div');

        section.setAttribute('data-mo-scroll-section', '1');
        target.appendChild(section);

        defineScrollMetrics(source, {
            scrollHeight: 1000,
            clientHeight: 500,
        });

        defineScrollMetrics(target, {
            scrollHeight: 2000,
            clientHeight: 1000,
        });

        defineScrollMetrics(section, {
            scrollHeight: 0,
            clientHeight: 0,
            offsetTop: 800,
        });

        source.scrollTop = 250;

        const sync = new DefaultEditorScrollSync();
        sync.mount(source, target);

        source.dispatchEvent(new Event('scroll'));

        expect(target.scrollTop).toBe(500);
    });

    it('does nothing when source cannot scroll', () => {
        const source = document.createElement('div');
        const target = document.createElement('div');

        defineScrollMetrics(source, {
            scrollHeight: 500,
            clientHeight: 500,
        });

        defineScrollMetrics(target, {
            scrollHeight: 2000,
            clientHeight: 1000,
        });

        const sync = new DefaultEditorScrollSync();
        sync.mount(source, target);

        source.dispatchEvent(new Event('scroll'));

        expect(target.scrollTop).toBe(0);
    });

    it('removes scroll listener on destroy', () => {
        const source = document.createElement('div');
        const target = document.createElement('div');

        const removeSpy = vi.spyOn(source, 'removeEventListener');

        const sync = new DefaultEditorScrollSync();

        sync.mount(source, target);
        sync.destroy();

        expect(removeSpy).toHaveBeenCalledWith(
            'scroll',
            expect.any(Function)
        );
    });

    it('scrolls target back to top when source is at top', () => {
        const source = document.createElement('div');
        const target = document.createElement('div');

        defineScrollMetrics(source, {
            scrollHeight: 1000,
            clientHeight: 500,
        });

        defineScrollMetrics(target, {
            scrollHeight: 2000,
            clientHeight: 1000,
        });

        source.scrollTop = 0;

        const sync = new DefaultEditorScrollSync();
        sync.mount(source, target);

        target.scrollTop = 500;

        source.dispatchEvent(new Event('scroll'));

        expect(target.scrollTop).toBe(0);
    });
});