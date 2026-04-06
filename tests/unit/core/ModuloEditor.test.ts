import {describe, expect, it} from "vitest";
import {
    type EditorDomSlots,
    type EditorInputAdapter,
    type EditorOutputAdapter, HiddenTextareaBridge,
    ModuloEditor
} from "../../../src";
import {DefaultEditorDocument} from "../../../src/core/DefaultEditorDocument";

class FakeInput implements EditorInputAdapter {
    private value = '';
    private listener: ((value: string) => void) | null = null;

    mount(_: HTMLElement, initialValue: string): void {
        this.value = initialValue;
    }

    getValue(): string {
        return this.value;
    }

    setValue(value: string): void {
        this.value = value;
    }

    focus(): void {}

    onChange(listener: (value: string) => void): () => void {
        this.listener = listener;

        return () => {
            this.listener = null;
        };
    }

    destroy(): void {}

    emit(value: string): void {
        this.value = value;
        this.listener?.(value);
    }
}

class FakeOutput implements EditorOutputAdapter {
    public html = '';

    mount(_: HTMLElement): void {}

    render(html: string): void {
        this.html = html;
    }

    destroy(): void {
        this.html = '';
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
    it('should initializes from textarea value', () => {
        const slots = createSlots();
        slots.textarea.value = 'hello';

        const editor = new ModuloEditor(
            new DefaultEditorDocument(),
            new FakeInput(),
            new FakeOutput(),
            new HiddenTextareaBridge()
        );

        editor.init(slots);
    });

    it('should sync the document and textarea on change', () => {
        const slots = createSlots();

        const input = new FakeInput();
        const output = new FakeOutput();

        const editor = new ModuloEditor(
            new DefaultEditorDocument(),
            input,
            output,
            new HiddenTextareaBridge()
        );

        editor.init(slots);

        input.emit('updated');

        expect(slots.textarea.value).toBe('updated');
        expect(output.html).toBe('updated')
    });
});