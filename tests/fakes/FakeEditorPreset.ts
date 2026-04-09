import type {EditorPreset} from "../../src/presets";
import type {ModuloEditorBuilder} from "../../src/core";


export class FakeEditorPreset implements EditorPreset {
    public readonly name = "fake";
    public applied = false;

    apply(_builder: ModuloEditorBuilder) {
        this.applied = true;
    }
}