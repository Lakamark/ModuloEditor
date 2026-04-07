import {
    BoldCommand,
    EditorCommandRegistry
} from "../../../src/commands";
import {FakeEditorCommand} from "../../fakes/FakeEditorCommand";
import {FakeEditorInput} from "../../fakes/FakeEditorInput";
import {createEditorContext} from "../../helpers/createEditorContext";

describe('EditorCommandRegistry', () => {
    it('registers a command', () => {
        const registry = new EditorCommandRegistry();
        const command = new FakeEditorCommand();

        registry.register(command);

        expect(registry.has('fake')).toBe(true);
        expect(registry.get("fake")).toBe(command);
    });

    it('returns a command by name', () => {
        const registry = new EditorCommandRegistry();
        const command = new FakeEditorCommand();

        registry.register(command);

        expect(registry.get('fake')).toBe(command)
    });

    it('returns true when a command exists', () => {
        const registry = new EditorCommandRegistry();
        const command = new FakeEditorCommand();

        registry.register(command);

        expect(registry.has('fake')).toBe(true);

    });

    it('returns false when a command does not exist', () => {
        const registry = new EditorCommandRegistry();

        expect(registry.has('fake')).toBe(false);
    });

    it('throws when registering a duplicate command', () => {
        const registry = new EditorCommandRegistry();
        const command = new FakeEditorCommand();

        registry.register(command);
        expect(registry.has('fake')).toBe(true);

        expect(() => {
            registry.register(command);
            expect(registry.has('fake')).toBe(false);
            expect(registry.get('fake')).returned(undefined);
        }).toThrow('Editor command "fake" is already registered.');
    });

    it('executes a registered command', () => {
        const registry = new EditorCommandRegistry();
        const command = new FakeEditorCommand();
        const input = new FakeEditorInput();
        const context = createEditorContext(input);

        registry.register(command);
        registry.execute('fake', context)

        expect(command.executed).toBe(true);
    });

    it('throws when executing an unknown command', () => {
        const registry = new EditorCommandRegistry();
        const input = new FakeEditorInput();
        const context = createEditorContext(input);

        expect(() => {
            registry.execute('fake', context);
        }).toThrow('Unknown editor command "fake"');
    });

    it('returns all registered commands', () => {
        const registry = new EditorCommandRegistry();
        const commandA = new FakeEditorCommand();
        const commandB = new BoldCommand();

        registry.register(commandA);
        registry.register(commandB);

        const commands = registry.all();

        expect(commands).length(2);
        expect(commands[0]).contain(commandA);
        expect(commands[1]).contain(commandB);
        expect(commands.includes(commandA));
        expect(commands.includes(commandB));
    });
});