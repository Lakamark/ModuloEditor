import {describe, expect, it} from "vitest";
import {createDefaultToolbarPlugins} from "../../../../src";
import {FakeEditorPluginApi} from "../../../fakes";

describe('createDefaultToolbarPlugins', () => {
    it("renders all default toolbar buttons", () => {

        const plugins = createDefaultToolbarPlugins();

        const api = new FakeEditorPluginApi();

        plugins.forEach(p => p.setup(api));

        const buttons = api.slots.toolbar?.querySelectorAll("button");

        expect(buttons?.length).toBeGreaterThan(1);


    });
});