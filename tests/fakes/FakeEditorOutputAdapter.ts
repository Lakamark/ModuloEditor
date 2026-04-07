import type { EditorOutputAdapter } from "../../src/output";

export class FakeEditorOutputAdapter implements EditorOutputAdapter {
    public mountedElement?: HTMLElement;

    public renderedHtml = "";
    public destroyed = false;

    public mount(element: HTMLElement): void {
        this.mountedElement = element;
    }

    public render(html: string): void {
        this.renderedHtml = html;
    }

    public destroy(): void {
        this.destroyed = true;
        this.mountedElement = undefined;
    }
}