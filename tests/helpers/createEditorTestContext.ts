import {ModuloEditor, type ModuloEditorOptions} from "../../src";
import {DefaultEditorDocument} from "../../src/core";
import {
    FakeEditorDomResolver,
    FakeEditorInputAdapter,
    FakeEditorOutputAdapter,
    FakeEditorPlugin,
    FakeMarkdownProcessor,
    FakeTextareaBridge
} from "../fakes";

export function createEditorTestContext(
    overrides: Partial<ModuloEditorOptions> = {}
) {
    const root = document.createElement('div');

    const inputElement = document.createElement('div');
    const previewElement = document.createElement('div');
    const textarea = document.createElement('textarea');

    const documentModel = new DefaultEditorDocument('Hello');
    const input = new FakeEditorInputAdapter();
    const output = new FakeEditorOutputAdapter();
    const markdown = new FakeMarkdownProcessor();
    const textareaBridge = new FakeTextareaBridge();
    const plugin = new FakeEditorPlugin();

    const domResolver = new FakeEditorDomResolver({
        root,
        header: null,
        toolbar: null,
        body: null,
        input: inputElement,
        preview: previewElement,
        footer: null,
        status: null,
        textarea,
    });

    const options: ModuloEditorOptions = {
        root,
        domResolver,
        document: documentModel,
        input,
        output,
        markdown,
        plugins: [plugin],
        textareaBridge,
        ...overrides,
    };

    const editor = new ModuloEditor(options);

    return {
        editor,
        options,
        root,
        textarea,
        inputElement,
        previewElement,
        documentModel,
        input,
        output,
        markdown,
        textareaBridge,
        plugin,
        domResolver,
    };
}