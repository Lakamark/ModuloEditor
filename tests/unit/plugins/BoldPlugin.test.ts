import {describe, expect, it, vi} from "vitest";
import {BoldToolbarPlugin} from "../../../src/plugins/BoldToolbarPlugin";

describe('BoldToolbarPlugin', () => {
    it('should render a bold button on setup', () => {
        const container = document.createElement('div');
        const plugin = new BoldToolbarPlugin(container);

        const api = {
            commands: {
                execute: vi.fn(),
                has: vi.fn(() => true)
            }
        };

        plugin.setup(api);

        const button = container.querySelector("button");

        expect(button).not.toBeNull();
        expect(button?.textContent).toBe("Bold");
    });

    it('should execute bold command when clicked', () => {
        const container = document.createElement('div');
        const plugin = new BoldToolbarPlugin(container);

        const execute = vi.fn();
        const has = vi.fn(() => true);

        const api = {
            commands: {
                execute,
                has
            }
        };

        plugin.setup(api);

        const button = container.querySelector('button');
        button?.click();

        expect(has).toHaveBeenCalledWith('bold');
        expect(execute).toHaveBeenCalledWith('bold');
    });

    it('should remove the button on destroy', () => {
        const container = document.createElement('div');
        const plugin = new BoldToolbarPlugin(container);

        const api = {
            commands: {
                execute: vi.fn(),
                has: vi.fn(() => true)
            }
        };

        plugin.setup(api);

        expect(container.querySelector('button')).not.toBeNull();

        plugin.destroy();

        expect(container.querySelector('button')).toBeNull();
    });
});