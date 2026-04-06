import type {TextareaBridge} from "./TextareaBridge";

/**
 * Default textarea bridge implementation.
 */
export class HiddenTextareaBridge implements TextareaBridge {
    private textarea: HTMLTextAreaElement | null = null;

    public mount(textarea: HTMLTextAreaElement): void {
        this.textarea = textarea;
    }

    public getValue(): string {
        return this.textarea?.value ?? '';
    }

    public setValue(value: string): void {
        if (!this.textarea) {
            return;
        }

        this.textarea.value = value;
    }

    public destroy(): void {
        this.textarea = null;
    }
}