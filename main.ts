import '/src/style/modulo-editor.css';
import {
    DefaultEditorDomInitializer,
    ModuloEditor,
    StarterKitPreset
} from "./src";

ModuloEditor
    .create()
    .fromTextarea("#content")
    .withDomInitializer(new DefaultEditorDomInitializer())
    .usePreset(new StarterKitPreset())
    .build()
    .init();