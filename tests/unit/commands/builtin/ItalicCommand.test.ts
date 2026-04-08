import {describe, expect, it} from "vitest";
import {ItalicCommand} from "../../../../src/commands";
import {FakeEditorInput} from "../../../fakes";
import {createEditorContext} from "../../../helpers";

describe('ItalicCommand', () => {
    it('should wraps the selected text with italic markers', () => {
        const input = new FakeEditorInput();
        input.value = "Hello world";
        input.selectionStart = 6;
        input.selectionEnd = 11;

        const context = createEditorContext(input);
        const command = new ItalicCommand();

        command.execute(context);

        expect(input.value).toBe("Hello *world*");
    });

    it('should place the cursor inside the inserted italic markers when there is no selection', () => {
        const input = new FakeEditorInput();
        input.value = "Hello ";
        input.selectionStart = 6;
        input.selectionEnd = 6;

        const context = createEditorContext(input);
        const command = new ItalicCommand();

        command.execute(context);

        expect(input.value).toBe("Hello **");
        expect(input.selectionStart).toBe(7);
        expect(input.selectionEnd).toBe(7);
    });

    it('should restore the selection around the wrapped text', () => {
        const input = new FakeEditorInput();
        input.value = "Hello world";
        input.selectionStart = 6;
        input.selectionEnd = 11;

        const context = createEditorContext(input);
        const command = new ItalicCommand();

        command.execute(context);

        expect(input.selectionStart).toBe(7);
        expect(input.selectionEnd).toBe(12);
    });

    it('should focus the input after execution', () => {
        const input = new FakeEditorInput();
        const context = createEditorContext(input);
        const command = new ItalicCommand();

        expect(input.focused).toBe(false);

        command.execute(context);

        expect(input.focused).toBe(true);
    });
});