import {ModuloEditor} from "./src";
import {DefaultEditorDomInitializer} from "./src/dom";
import {StarterKitPreset} from "./src/presets";

ModuloEditor
    .create()
    .fromTextarea("#content")
    .withDomInitializer(new DefaultEditorDomInitializer())
    .usePreset(new StarterKitPreset())
    .build()
    .init();