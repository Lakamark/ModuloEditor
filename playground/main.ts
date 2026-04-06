import './style.css';
import {
    DEFAULT_HTML_SANITIZER_CONFIG,
    DefaultEditorDomResolver,
    DefaultMarkdownProcessor,
    HiddenTextareaBridge,
    HtmlPreviewAdapter,
    ModuloEditor,
    TextareaInputAdapter
} from "../src";
import {DefaultEditorDocument} from "../src/core/DefaultEditorDocument";
import {PlainTextMarkdownParser} from "../src/markdown/PlainTextMarkdownParser";
import {DomPurifyHtmlSanitizer} from "../src/markdown/sanitizers/DomPurifyHtmlSanitizer";

const root = document.querySelector<HTMLElement>('[data-mo-editor]');

if (!root) {
    throw new Error('Demo: missing [data-mo-editor] root element.');
}

const resolver = new DefaultEditorDomResolver();
const slots = resolver.resolve(root);

const processor = new DefaultMarkdownProcessor(
    new PlainTextMarkdownParser(),
    new DomPurifyHtmlSanitizer(DEFAULT_HTML_SANITIZER_CONFIG)
);

const editor = new ModuloEditor(
    new DefaultEditorDocument(),
    new TextareaInputAdapter(),
    new HtmlPreviewAdapter(),
    new HiddenTextareaBridge(),
    processor
);

editor.init(slots);

const status = slots.status;
if (status) {
    status.textContent = 'ModuloEditor mounted';
}