import {describe, it, expect} from "vitest";
import {FakeEditorCommand, FakeEditorPlugin} from "../../fakes";
import {createEditorTestContext} from "../../helpers";
import {BoldToolbarPlugin} from "../../../src/plugins";
import {ModuloEditor} from "../../../src";

describe("ModuloEditor", () => {
    it("renders the initial preview on init", () => {
        const {editor, output} = createEditorTestContext();

        editor.init();

        expect(output.renderedHtml).toBe("<p>Hello</p>");
    });

    it("updates the document and output when the input value changes", () => {
        const {editor, input, output, documentModel} = createEditorTestContext();

        editor.init();
        input.emitChange("Updated");

        expect(documentModel.getRawContent()).toBe("Updated");
        expect(output.renderedHtml).toBe("<p>Updated</p>");
    });

    it("sets the value on the document, input and output", () => {
        const {editor, input, output, documentModel} = createEditorTestContext();

        editor.init();
        editor.setValue("New value");

        expect(documentModel.getRawContent()).toBe("New value");
        expect(input.getValue()).toBe("New value");
        expect(output.renderedHtml).toBe("<p>New value</p>");
    });

    it("returns the current document value", () => {
        const {editor} = createEditorTestContext();

        expect(editor.getValue()).toBe("Hello");
    });

    it("focuses the input", () => {
        const {editor, input} = createEditorTestContext();

        expect(input.focused).toBe(false);

        editor.focus();

        expect(input.focused).toBe(true);
    });

    it("removes the input listener on destroy", () => {
        const {editor, input, documentModel, output} = createEditorTestContext();

        editor.init();
        editor.destroy();

        input.emitChange("After destroy");

        expect(documentModel.getRawContent()).toBe("Hello");
        expect(output.renderedHtml).toBe("<p>Hello</p>");
    });

    it("executes a registered command", () => {
        const command = new FakeEditorCommand();

        const {editor} = createEditorTestContext({
            commands: [command],
            builtinCommands: false
        });

        editor.init();
        editor.executeCommand("fake");

        expect(command.executed).toBe(true);
    });

    it("passes the current input state to the executed command", () => {
        const command = new FakeEditorCommand();

        const {editor, input} = createEditorTestContext({
            commands: [command],
            builtinCommands: false
        });

        editor.init();
        editor.executeCommand("fake");

        expect(command.receivedContext).not.toBeNull();
        expect(command.receivedContext?.input).toBe(input);
        expect(command.receivedContext?.state).toEqual({
            value: "Hello",
            selectionStart: 0,
            selectionEnd: 0,
        });
    });

    it("sets up all plugins on init", () => {
        const {editor, plugin} = createEditorTestContext();

        editor.init();

        expect(plugin.setupCalled).toBe(true);
        expect(plugin.receivedApi).not.toBeNull();
    });

    it("destroys all plugins on destroy", () => {
        const {editor, plugin} = createEditorTestContext();

        editor.init();
        editor.destroy();

        expect(plugin.destroyCalled).toBe(true);
    });

    it("exposes command execution through the plugin api", () => {
        const {editor, plugin} = createEditorTestContext();

        editor.init();

        expect(plugin.receivedApi?.executeCommand).toBeTypeOf("function");
    });

    it("connects the textarea bridge on init", () => {
        const {editor, textareaBridge, textarea} = createEditorTestContext();

        editor.init();

        expect(textareaBridge.mountedTextarea).toBe(textarea);
    });

    it("syncs the textarea value when input changes", () => {
        const {editor, input, textarea} = createEditorTestContext();

        editor.init();
        input.emitChange("Updated");

        expect(textarea.value).toBe("Updated");
    });

    it("syncs the textarea value when setValue is called", () => {
        const {editor, textarea} = createEditorTestContext();

        editor.init();
        editor.setValue("New value");

        expect(textarea.value).toBe("New value");
    });

    it("disconnects the textarea bridge on destroy", () => {
        const {editor, textareaBridge} = createEditorTestContext();

        editor.init();
        editor.destroy();

        expect(textareaBridge.mountedTextarea).toBe(null);
    });

    it("mounts the input adapter with resolved input element", () => {
        const { editor, input, inputElement } = createEditorTestContext();

        editor.init();

        expect(input.mountedElement).toBe(inputElement);
    });

    it("mounts the input adapter with resolved input element and initial value", () => {
        const { editor, input, inputElement } = createEditorTestContext();

        editor.init();

        expect(input.mountedElement).toBe(inputElement);
        expect(input.mountedInitialValue).toBe("Hello");
    });

    it("mounts the output adapter with resolved preview element", () => {
        const { editor, output, previewElement } = createEditorTestContext();

        editor.init();

        expect(output.mountedElement).toBe(previewElement);
    });

    it("executes bold command from toolbar button through ModuloEditor", () => {
        const {editor, toolbar, input} = createEditorTestContext(
            {
                builtinCommands: true,
            },
            () => [new BoldToolbarPlugin()]
        );

        editor.init();

        input.selectionStart = 0;
        input.selectionEnd = 5;

        const button = toolbar.querySelector("button");

        expect(button).not.toBeNull();

        button?.click();

        expect(input.getValue()).toBe("**Hello**");
    });
});

describe('ModuloEditor.create', () => {
    it('returns a fluent builder', () => {
        const builder = ModuloEditor.create('#editor');

        expect(builder).toBeDefined();
        expect(typeof builder.use).toBe('function');
        expect(typeof builder.withoutPlugins).toBe('function');
        expect(typeof builder.init).toBe('function');
    });

    it('returns the same builder instance when calling use', () => {
        const builder = ModuloEditor.create('#editor');
        const plugin = new FakeEditorPlugin();

        const result = builder.use(plugin);

        expect(result).toBe(builder);
    });

    it('returns the same builder instance when calling withoutPlugins', () => {
        const builder = ModuloEditor.create('#editor');

        const result = builder.withoutPlugins();

        expect(result).toBe(builder);
    });
});