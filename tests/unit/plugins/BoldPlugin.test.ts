import { describe, expect, it } from "vitest";
import { BoldToolbarPlugin } from "../../../src";
import { FakeEditorPluginApi } from "../../fakes";

describe("BoldToolbarPlugin", () => {
    it("should render a bold button on setup", () => {
        const api = new FakeEditorPluginApi();
        const plugin = new BoldToolbarPlugin();

        plugin.setup(api);

        const button = api.slots.toolbar?.querySelector("button");

        expect(button).not.toBeNull();
        expect(button?.textContent).toBe("Bold");
    });

    it("should execute bold command when clicked", () => {
        const api = new FakeEditorPluginApi();
        const plugin = new BoldToolbarPlugin();

        plugin.setup(api);

        const button = api.slots.toolbar?.querySelector("button");
        button?.click();

        expect(api.commands.has).toHaveBeenCalledWith("bold");
        expect(api.executeCommand).toHaveBeenCalledWith("bold");
    });

    it("should remove the button on destroy", () => {
        const api = new FakeEditorPluginApi();
        const plugin = new BoldToolbarPlugin();

        plugin.setup(api);

        expect(api.slots.toolbar?.querySelector("button")).not.toBeNull();

        plugin.destroy();

        expect(api.slots.toolbar?.querySelector("button")).toBeNull();
    });

    it("should not throw when toolbar slot is missing", () => {
        const api = new FakeEditorPluginApi();
        api.slots.toolbar = null;
        const plugin = new BoldToolbarPlugin();

        expect(() => {
            plugin.setup(api);
        }).not.toThrow();
    });

    it("should execute bold command when shortcut is pressed", () => {
        const api = new FakeEditorPluginApi();
        const plugin = new BoldToolbarPlugin();

        plugin.setup(api);

        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "b",
                ctrlKey: true,
            })
        );

        expect(api.executeCommand).toHaveBeenCalledWith("bold");

        plugin.destroy();
    });

    it("should not execute bold command when shortcut does not match", () => {
        const api = new FakeEditorPluginApi();
        const plugin = new BoldToolbarPlugin();

        plugin.setup(api);

        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "i",
                ctrlKey: true,
            })
        );

        expect(api.executeCommand).not.toHaveBeenCalled();

        plugin.destroy();
    });
});