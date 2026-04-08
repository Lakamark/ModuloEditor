import {describe, expect, it} from "vitest";
import {createDefaultToolbarPlugins} from "../../../../src/plugins";
import {FakeEditorPluginApi} from "../../../fakes";

describe('createDefaultToolbarPlugins', () => {
    it("renders all default toolbar buttons", () => {
        const toolbar = document.createElement("div");

        const plugins = createDefaultToolbarPlugins(toolbar);

        const api = new FakeEditorPluginApi();

        plugins.forEach(p => p.setup(api));

        const buttons = toolbar.querySelectorAll("button");

        expect(buttons.length).toBeGreaterThan(1);
    });
});