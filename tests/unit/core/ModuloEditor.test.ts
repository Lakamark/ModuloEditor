import {describe, it, expect} from "vitest";
import {
    type EditorDomSlots,
    type EditorInputAdapter,
    type EditorOutputAdapter, HiddenTextareaBridge,
    type MarkdownProcessor,
    ModuloEditor
} from "../../../src";
import {DefaultEditorDocument} from "../../../src/core/DefaultEditorDocument";

class FakeInput implements EditorInputAdapter {
    private value = '';
    private listener: ((value: string) => void) | null = null;

    public mount(_: HTMLElement, initialValue: string): void {
        this.value = initialValue;
    }

    public getValue(): string {
        return this.value;
    }

    public setValue(value: string): void {
        this.value = value;
    }

    public focus(): void {}

    public onChange(listener: (value: string) => void): () => void {
        this.listener = listener;

        return () => {
            this.listener = null;
        };
    }

    public destroy(): void {}

    public emit(value: string): void {
        this.value = value;
        this.listener?.(value);
    }
}

class FakeOutput implements EditorOutputAdapter {
    public html = '';

    public mount(_: HTMLElement): void {}

    public render(html: string): void {
        this.html = html;
    }

    public destroy(): void {
        this.html = '';
    }
}

class FakeMarkdownProcessor implements MarkdownProcessor {
    public toHtml(markdown: string): string {
        return `<p>${markdown}</p>`;
    }
}

function createSlots(): EditorDomSlots {
    return {
        root: document.createElement('div'),
        header: null,
        toolbar: null,
        body: null,
        input: document.createElement('div'),
        preview: document.createElement('div'),
        footer: null,
        status: null,
        textarea: document.createElement('textarea')
    };
}

describe('ModuloEditor', () => {
    it('renders processed initial textarea value', () => {
        const slots = createSlots();
        slots.textarea.value = 'hello';

        const output = new FakeOutput();

        const editor = new ModuloEditor(
            new DefaultEditorDocument(),
            new FakeInput(),
            output,
            new HiddenTextareaBridge(),
            new FakeMarkdownProcessor()
        );

        editor.init(slots);

        expect(output.html).toBe('<p>hello</p>');
    });

    it('syncs document and textarea on change', () => {
        const slots = createSlots();

        const input = new FakeInput();
        const output = new FakeOutput();

        const editor = new ModuloEditor(
            new DefaultEditorDocument(),
            input,
            output,
            new HiddenTextareaBridge(),
            new FakeMarkdownProcessor()
        );

        editor.init(slots);
        input.emit('updated');

        expect(slots.textarea.value).toBe('updated');
        expect(output.html).toBe('<p>updated</p>');
    });
});