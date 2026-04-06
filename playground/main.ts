import './style.css';
import {
    DefaultEditorDomResolver,
    DefaultMarkdownProcessor,
    HiddenTextareaBridge,
    HtmlPreviewAdapter,
    ModuloEditor,
    PlainTextMarkdownParser,
    TextareaInputAdapter
} from "../src";
import {DefaultEditorDocument} from "../src/core/DefaultEditorDocument";
import {ConfigurableHtmlSanitizer} from "../src/markdown/config/ConfigurableHtmlSanitizer";
import {DEFAULT_SANITIZER_CONFIG} from "../src/markdown/config/DefaultHtmlSanitizerConfig";

const root = document.querySelector<HTMLElement>('[data-mo-editor]');

if (!root) {
    throw new Error('Demo: missing [data-mo-editor] root element.');
}

const resolver = new DefaultEditorDomResolver();
const slots = resolver.resolve(root);

const processor = new DefaultMarkdownProcessor(
    new PlainTextMarkdownParser(),
    new ConfigurableHtmlSanitizer(DEFAULT_SANITIZER_CONFIG)
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