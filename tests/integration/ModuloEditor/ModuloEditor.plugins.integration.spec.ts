import { describe, expect, it, vi } from "vitest";
import { FakeEditorCommand } from "../../fakes";
import { createEditorTestBed } from "./helpers/createEditorTestBed";

describe('ModuloEditor integration: plugins', () => {
    it('provides the plugin api during setup', () => {
        const { editor, plugin } = createEditorTestBed();

        editor.init();

        expect(plugin.setupCalled).toBe(true);
        expect(plugin.receivedApi).not.toBeNull();
    });

    it('provides resolved dom slots to plugins', () => {
        const { editor, plugin } = createEditorTestBed();

        editor.init();

        expect(plugin.receivedApi).not.toBeNull();
        expect(plugin.receivedApi?.slots.input).toBeInstanceOf(HTMLElement);
        expect(plugin.receivedApi?.slots.preview).toBeInstanceOf(HTMLElement);
        expect(plugin.receivedApi?.slots.textarea).toBeInstanceOf(HTMLTextAreaElement);
    });

    it('provides the commands api to plugins', () => {
        const { editor, plugin } = createEditorTestBed();

        editor.init();

        expect(plugin.receivedApi).not.toBeNull();
        expect(plugin.receivedApi?.commands).toBeDefined();
        expect(typeof plugin.receivedApi?.commands.execute).toBe('function');
        expect(typeof plugin.receivedApi?.commands.has).toBe('function');
    });

    it('provides executeCommand helper to plugins', () => {
        const { editor, plugin } = createEditorTestBed();

        editor.init();

        expect(plugin.receivedApi).not.toBeNull();
        expect(typeof plugin.receivedApi?.executeCommand).toBe('function');
    });

    it('allows plugins to execute a registered command through the plugin api', () => {
        const command = new FakeEditorCommand('fake', 'Changed by plugin');
        const { editor, plugin, document, output, markdown, textareaBridge } = createEditorTestBed({
            content: 'Hello',
            commands: [command],
        });

        editor.init();
        plugin.receivedApi?.executeCommand('fake');

        expect(command.executed).toBe(true);
        expect(document.getRawContent()).toBe('Changed by plugin');
        expect(textareaBridge.getValue()).toBe('Changed by plugin');
        expect(markdown.lastValue).toBe('Changed by plugin');
        expect(output.renderedHtml).toBe('<p>Changed by plugin</p>');
    });

    it('provides the registry-backed commands api to plugins', () => {
        const command = new FakeEditorCommand('fake');
        const { editor, plugin } = createEditorTestBed({
            commands: [command],
        });

        editor.init();

        expect(plugin.receivedApi?.commands.has('fake')).toBe(true);
    });

    it('does not set up the same plugin twice when init is called twice', () => {
        const { editor, plugin } = createEditorTestBed();

        editor.init();
        editor.init();

        expect(plugin.setupCalls).toBe(1);
    });

    it('destroys plugins when editor is destroyed', () => {
        const { editor, plugin } = createEditorTestBed();

        editor.init();
        editor.destroy();

        expect(plugin.destroyCalled).toBe(true);
    });

    it('provides the event bus api to plugins', () => {
        const { editor, plugin } = createEditorTestBed();

        editor.init();

        expect(plugin.receivedApi?.events).toBeDefined();
        expect(typeof plugin.receivedApi?.events.on).toBe('function');
        expect(typeof plugin.receivedApi?.events.emit).toBe('function');
        expect(typeof plugin.receivedApi?.events.clear).toBe('function');
    });

    it('emits editor init event through the plugin api', () => {
        const { editor, plugin } = createEditorTestBed();

        editor.init();

        const listener = vi.fn();

        plugin.receivedApi?.events.on('editor:init', listener);

        plugin.receivedApi?.events.emit('editor:init', {
            timestamp: Date.now(),
        });

        expect(listener).toHaveBeenCalledOnce();
    });

    it('emits content change events when value changes programmatically', () => {
        const { editor, plugin } = createEditorTestBed();

        editor.init();

        const listener = vi.fn();

        plugin.receivedApi?.events.on('content:change', listener);

        editor.setValue('Changed from test');

        expect(listener).toHaveBeenCalledOnce();

        expect(listener).toHaveBeenCalledWith({
            value: 'Changed from test',
            html: '<p>Changed from test</p>',
            source: 'programmatic',
        });
    });

    it('emits content change events when input changes', () => {
        const { editor, plugin, input } = createEditorTestBed();

        editor.init();

        const listener = vi.fn();

        plugin.receivedApi?.events.on('content:change', listener);

        input.triggerInput('Changed from input');

        expect(listener).toHaveBeenCalledOnce();

        expect(listener).toHaveBeenCalledWith({
            value: 'Changed from input',
            html: '<p>Changed from input</p>',
            source: 'input',
        });
    });

    it('synchronizes document, textarea and preview when input changes', () => {
        const { editor, input, document, textareaBridge, markdown, output } =
            createEditorTestBed({
                content: 'Before',
            });

        editor.init();

        input.triggerInput('Changed from input');

        expect(document.getRawContent()).toBe('Changed from input');
        expect(textareaBridge.getValue()).toBe('Changed from input');
        expect(markdown.lastValue).toBe('Changed from input');
        expect(output.renderedHtml).toBe('<p>Changed from input</p>');
    });
});