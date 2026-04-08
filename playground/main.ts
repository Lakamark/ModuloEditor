import './style.css';
import {DefaultEditorDomResolver} from "../src/dom";
import {DefaultMarkdownProcessor, ModuloEditor} from "../src";
import {TextareaInputAdapter} from "../src/input";
import {HiddenTextareaBridge} from "../src/textarea";
import {createDefaultToolbarPlugins} from "../src/plugins";
import {HtmlPreviewAdapter} from "../src/output";
import {
    DEFAULT_HTML_SANITIZER_CONFIG,
    DomPurifyHtmlSanitizer,
    PlainTextMarkdownParser
} from "../src/markdown";

const root = document.querySelector('[data-mo-editor]') as HTMLElement;

const domResolver = new DefaultEditorDomResolver();
const slots = domResolver.resolve(root);

const editor = new ModuloEditor({
    root,
    domResolver,
    input: new TextareaInputAdapter(),
    output: new HtmlPreviewAdapter(),
    markdown: new DefaultMarkdownProcessor(
        new PlainTextMarkdownParser(), // TODO add marked Processor
        new DomPurifyHtmlSanitizer(DEFAULT_HTML_SANITIZER_CONFIG)
    ),
    textareaBridge: new HiddenTextareaBridge(),
    plugins: createDefaultToolbarPlugins(slots.toolbar!)
});

editor.init();