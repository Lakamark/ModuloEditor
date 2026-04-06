import {describe, expect, it} from "vitest";
import {FakeEditorInput} from "../../../fakes/FakeEditorInput";
import {BoldCommand} from "../../../../src/commands/builtin/BoldCommand";

describe('BoldCommand', () => {
    it('wraps the selected text with bold markers', () => {
        const input = new FakeEditorInput();
        input.value = 'hello world';
        input.selectionStart = 6;
        input.selectionEnd = 11;

        const context = {
            input,
            state: input.getState()
        };

        const command = new BoldCommand();

        command.execute(context);


        expect(input.value).toBe('hello **world**');
        expect(input.focused).toBe(true);
        expect(input.selectionStart).toBe(8);
        expect(input.selectionEnd).toBe(13);
    });
    it('inserts empty bold markers when there is no selection', () => {});
    it('restores the selection around the wrapped text', () => {});
    it('places the cursor inside the inserted bold markers when there is no selection', () => {});
    it('focuses the input after execution', () => {});
});