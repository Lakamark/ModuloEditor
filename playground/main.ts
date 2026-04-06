import './style.css';
import {
    DefaultEditorDomResolver,
    HiddenTextareaBridge,
    HtmlPreviewAdapter,
    ModuloEditor,
    TextareaInputAdapter
} from "../src";
import {DefaultEditorDocument} from "../src/core/DefaultEditorDocument";

const root = document.querySelector<HTMLElement>('[data-mo-editor]');

if (!root) {
    throw new Error('Demo: missing [data-mo-editor] root element.');
}

const resolver = new DefaultEditorDomResolver();
const slots = resolver.resolve(root);

const editor = new ModuloEditor(
    new DefaultEditorDocument(),
    new TextareaInputAdapter(),
    new HtmlPreviewAdapter(),
    new HiddenTextareaBridge()
);

editor.init(slots);

const status = slots.status;
if (status) {
    status.textContent = 'ModuloEditor mounted';
}