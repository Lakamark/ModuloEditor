import type {EditorOutputAdapter} from "./EditorOutputAdapter";

/**
 * Default output adapter that renders HTML inside a preview container.
 */
export class HtmlPreviewAdapter implements EditorOutputAdapter {
    private element: HTMLElement | null = null;

    /**
     * Attaches the adapter to a preview container.
     */
    public mount(element: HTMLElement):void {
        this.element = element;
    }

    /**
     * Renders HTML inside the mounted preview container.
     */
    public render(html: string) {
        if (!this.element) {
            return;
        }

        this.element.innerHTML = html;
    }

    /**
     * Clears the mounted element reference.
     */
    public destroy(): void {
        if (this.element) {
            this.element.innerHTML = '';
        }

        this.element = null;
    }
}