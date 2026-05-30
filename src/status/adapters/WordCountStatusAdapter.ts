import type {
    EditorStatusAdapter,
    EditorStatusState
} from "../contracts";

/**
 * Status adapter that renders word and character counts.
 */
export class WordCountStatusAdapter  implements EditorStatusAdapter {
    private element?: HTMLElement;

    public mount(element: HTMLElement): void {
        this.element = element;
        this.render(0, 0);
    }

    public update(state: EditorStatusState): void {
        this.render(state.words, state.characters);
    }

    public destroy(): void {
        if (this.element) {
            this.element.textContent = "";
        }

        this.element = undefined;
    }

    private render(words: number, characters: number): void {
        if (!this.element) {
            return;
        }

        this.element.textContent = `${words} words · ${characters} characters`;
    }
}