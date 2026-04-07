import {describe, expect, it} from "vitest";
import {FakeEditorInput} from "../../../fakes/FakeEditorInput";
import {HeadingCommand} from "../../../../src/commands";
import {createEditorContext} from "../../../helpers/createEditorContext";
describe("HeadingCommand", () => {
    it("adds a heading prefix at the start of the current line", () => {
        const input = new FakeEditorInput();
        input.value = "Hello world";
        input.selectionStart = 6;
        input.selectionEnd = 6;

        const context = createEditorContext(input);
        const command = new HeadingCommand(2);

        command.execute(context);

        expect(input.value).toBe("## Hello world");
    });

    it("keeps the cursor at the same logical position in the line", () => {
        const input = new FakeEditorInput();
        input.value = "Hello world";
        input.selectionStart = 6;
        input.selectionEnd = 6;

        const context = createEditorContext(input);
        const command = new HeadingCommand(2);

        command.execute(context);

        expect(input.selectionStart).toBe(9);
        expect(input.selectionEnd).toBe(9);
    });

    it("adds the heading only to the current line in a multi-line value", () => {
        const input = new FakeEditorInput();
        input.value = "First line\nSecond line\nThird line";
        input.selectionStart = 14;
        input.selectionEnd = 14;

        const context = createEditorContext(input);
        const command = new HeadingCommand(3);

        command.execute(context);

        expect(input.value).toBe("First line\n### Second line\nThird line");
    });

    it("adds a level 1 heading when the cursor is at the beginning of the line", () => {
        const input = new FakeEditorInput();
        input.value = "Hello world";
        input.selectionStart = 0;
        input.selectionEnd = 0;

        const context = createEditorContext(input);
        const command = new HeadingCommand(1);

        command.execute(context);

        expect(input.value).toBe("# Hello world");
        expect(input.selectionStart).toBe(2);
        expect(input.selectionEnd).toBe(2);
    });

    it("focuses the input after execution", () => {
        const input = new FakeEditorInput();
        input.value = "Hello world";
        input.selectionStart = 0;
        input.selectionEnd = 0;

        const context = createEditorContext(input);
        const command = new HeadingCommand(1);

        expect(input.focused).toBe(false);

        command.execute(context);

        expect(input.focused).toBe(true);
    });

    it("throws when the heading level is invalid", () => {
        expect(() => new HeadingCommand(0)).toThrow(
            "Heading level must be between 1 and 6."
        );

        expect(() => new HeadingCommand(7)).toThrow(
            "Heading level must be between 1 and 6."
        );
    });
});