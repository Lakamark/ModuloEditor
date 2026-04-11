import {createEditorDomFixture} from "./createEditorDomFixture";
import {
    DefaultEditorDocument,
    ModuloEditor
} from "../../../../src/core";
import type { EditorCommand } from "../../../../src";
import {
    FakeEditorInput,
    FakeEditorOutputAdapter,
    FakeEditorPlugin,
    FakeMarkdownProcessor,
    FakeTextareaBridge
} from "../../../fakes";

interface CreateEditorTestBedOptions {
    readonly content?: string;
    readonly commands?: readonly EditorCommand[];
}

export function createEditorTestBed(
    {
        content = 'Hello world',
        commands = [],
    }: CreateEditorTestBedOptions = {}
) {
    const root = createEditorDomFixture();

    const document = new DefaultEditorDocument(content);
    const input = new FakeEditorInput();
    const output = new FakeEditorOutputAdapter();
    const markdown = new FakeMarkdownProcessor();
    const textareaBridge = new FakeTextareaBridge();
    const plugin = new FakeEditorPlugin();

    const editor = new ModuloEditor({
        root,
        document,
        input,
        output,
        markdown,
        textareaBridge,
        plugins: [plugin],
        commands,
        builtinCommands: false,
    });

    return {
        root,
        editor,
        document,
        input,
        output,
        markdown,
        textareaBridge,
        plugin,
    };
}