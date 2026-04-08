import { describe, expect, it } from "vitest";
import { BoldToolbarPlugin } from "../../../src/plugins";
import { FakeEditorPluginApi } from "../../fakes";

describe("BoldToolbarPlugin", () => {
    it("should render a bold button on setup", () => {
        const container = document.createElement("div");
        const plugin = new BoldToolbarPlugin(container);
        const api = new FakeEditorPluginApi();

        plugin.setup(api);

        const button = container.querySelector("button");

        expect(button).not.toBeNull();
        expect(button?.textContent).toBe("Bold");
    });

    it("should execute bold command when clicked", () => {
        const container = document.createElement("div");
        const plugin = new BoldToolbarPlugin(container);
        const api = new FakeEditorPluginApi();

        plugin.setup(api);

        const button = container.querySelector("button");
        button?.click();

        expect(api.commands.has).toHaveBeenCalledWith("bold");
        expect(api.executeCommand).toHaveBeenCalledWith("bold");
    });

    it("should remove the button on destroy", () => {
        const container = document.createElement("div");
        const plugin = new BoldToolbarPlugin(container);
        const api = new FakeEditorPluginApi();

        plugin.setup(api);

        expect(container.querySelector("button")).not.toBeNull();

        plugin.destroy();

        expect(container.querySelector("button")).toBeNull();
    });
});