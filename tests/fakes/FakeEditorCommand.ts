import type {
    EditorCommand,
    EditorCommandContext
} from "../../src";

export class FakeEditorCommand implements EditorCommand {
    public readonly name: string;
    public executed = false;
    public receivedContext: EditorCommandContext | null = null;

    private readonly nextValue?: string;

    public constructor(name = "fake", nextValue?: string) {
        this.name = name;
        this.nextValue = nextValue;
    }

    public execute(context: EditorCommandContext): void {
        this.executed = true;
        this.receivedContext = context;

        if (this.nextValue !== undefined) {
            context.input.setValue(this.nextValue);
        }
    }
}