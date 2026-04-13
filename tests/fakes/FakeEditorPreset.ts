import type {ModuloEditorBuilder} from "../../src";

export class FakeEditorPreset {
    public readonly name = "fake";
    public applied = false;

    public apply(_builder: ModuloEditorBuilder): void {
        this.applied = true;
    }
}