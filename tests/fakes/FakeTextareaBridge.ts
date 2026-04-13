import type {TextareaBridge} from "../../src";

export class FakeTextareaBridge implements TextareaBridge {
    public mountedTextarea: HTMLTextAreaElement | null = null;

    public mount(textarea: HTMLTextAreaElement): void {
        this.mountedTextarea = textarea;
    }

    public getValue(): string {
        return this.mountedTextarea?.value ?? '';
    }

    public setValue(value: string): void {
        if (this.mountedTextarea) {
            this.mountedTextarea.value = value;
        }
    }

    public destroy(): void {
        this.mountedTextarea = null;
    }
}