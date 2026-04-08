import {describe, expect, it} from "vitest";
import {FakeEditorInput} from "../../../fakes";
import {createEditorContext} from "../../../helpers";
import {BoldCommand} from "../../../../src/commands";

describe('BoldCommand', () => {
    it('wraps the selected text with bold markers', () => {
        const input = new FakeEditorInput();
        input.value = 'hello world';
        input.selectionStart = 6;
        input.selectionEnd = 11;

        const context = createEditorContext(input);

        const command = new BoldCommand();

        command.execute(context);


        expect(input.value).toBe('hello **world**');
        expect(input.focused).toBe(true);
        expect(input.selectionStart).toBe(8);
        expect(input.selectionEnd).toBe(13);
    });

    it('inserts empty bold markers when there is no selection', () => {
        const input = new FakeEditorInput();
        input.value = '';
        input.selectionStart = 6;
        input.selectionEnd = 6;

        const context = createEditorContext(input);

        const command = new BoldCommand();
        command.execute(context);

        expect(input.value).toBe('****');
        expect(input.focused).toBe(true);
    });

    it('restores the selection around the wrapped text', () => {
        const input = new FakeEditorInput();
        input.value = 'hello world';
        input.selectionStart = 6;
        input.selectionEnd = 11;

        const context = createEditorContext(input);

        const command = new BoldCommand();
        command.execute(context);

        expect(input.getValue()).toBe('hello **world**');
        expect(input.selectionStart).toBe(8);
        expect(input.selectionEnd).toBe(13);
    });

    it('places the cursor inside the inserted bold markers when there is no selection', () => {
        const input = new FakeEditorInput();
        input.value = 'hello world';
        input.selectionStart = 6;
        input.selectionEnd = 6;

        const context = createEditorContext(input);

        const command = new BoldCommand();
        command.execute(context);

        expect(input.value).toBe('hello ****world');
        expect(input.selectionStart).toBe(8);
        expect(input.selectionEnd).toBe(8);
    });

    it('focuses the input after execution', () => {
        const input = new FakeEditorInput();

        const context = createEditorContext(input);

        const command = new BoldCommand();

        expect(input.focused).toBe(false);

        command.execute(context);

        expect(input.focused).toBe(true);
    });
});