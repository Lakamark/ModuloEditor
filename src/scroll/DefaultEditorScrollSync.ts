import type {EditorScrollSync} from "./contracts";
import {EDITOR_DOM_ATTRIBUTES} from "../dom/constants";

/**
 * Default scroll synchronization strategy.
 *
 * Uses a scroll ratio between the source and target elements.
 * If preview sections are present, the ratio is mapped against
 * the generated scroll section anchors.
 */
export class DefaultEditorScrollSync implements EditorScrollSync {
    private source?: HTMLElement;
    private target?: HTMLElement;
    private syncing = false;

    public mount(source: HTMLElement, target: HTMLElement): void {
        this.source = source;
        this.target = target;


        source.addEventListener('scroll', this.handleScroll);
    }

    public destroy(): void {
        this.source?.removeEventListener('scroll', this.handleScroll);

        this.source = undefined;
        this.target = undefined;
        this.syncing = false;
    }

    private readonly handleScroll = (): void => {
        if (!this.source || !this.target || this.syncing) {
            return;
        }

        this.syncing = true;

        const ratio = this.getScrollRatio(this.source);

        this.target.scrollTop = this.getTargetScrollTop(this.target, ratio);

        requestAnimationFrame(() => {
            this.syncing = false;
        });
    };

    private getScrollRatio(element: HTMLElement): number {
        const maxScroll = element.scrollHeight - element.clientHeight;

        if (maxScroll <= 0) {
            return 0;
        }

        return element.scrollTop / maxScroll;
    }

    private getTargetScrollTop(target: HTMLElement, ratio: number): number {
        const maxScroll = target.scrollHeight - target.clientHeight;

        if (maxScroll <= 0) {
            return 0;
        }

        const sections = Array.from(
            target.querySelectorAll<HTMLElement>(
                `[${EDITOR_DOM_ATTRIBUTES.scrollSection}]`
            )
        );

        if (sections.length === 0) {
            return ratio * maxScroll;
        }

        if (ratio <= 0) {
            return 0;
        }

        if (ratio >= 1) {
            return maxScroll;
        }

        const lastSection = sections[sections.length - 1];
        const sectionMax = Math.max(lastSection.offsetTop, maxScroll);

        return Math.min(
            ratio * sectionMax,
            maxScroll
        );
    }
}