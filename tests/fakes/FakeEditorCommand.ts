import type {
    EditorCommand,
    EditorCommandContext
} from "../../src";

export class FakeEditorCommand implements EditorCommand {
    public readonly name: string;
    public executed = false;
    public receivedContext: EditorCommandContext | null = null;

    public constructor(name = "fake") {
        this.name = name;
    }

    public execute(context: EditorCommandContext): void {
        this.executed = true;
        this.receivedContext = context;
    }
}