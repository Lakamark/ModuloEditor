import { describe, expect, it } from "vitest";
import {DefaultModuloEditorBuilder} from "../../../src/core/Builder";
import {DefaultEditorPreset} from "../../../src";

describe("DefaultEditorPreset", () => {
    it("should apply without throwing", () => {
        const builder = new DefaultModuloEditorBuilder("test");

        expect(() => {
            builder.usePreset(new DefaultEditorPreset());
        }).not.toThrow();
    });
});