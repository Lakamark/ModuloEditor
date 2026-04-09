import { describe, expect, it } from "vitest";
import { DefaultModuloEditorBuilder } from "../../../../src/core/Builder";
import {FakeEditorDomResolver, FakeEditorPreset} from "../../../fakes";

describe("DefaultModuloEditorBuilder", () => {
    it("should apply the preset", () => {
        const preset = new FakeEditorPreset();
        const builder = new DefaultModuloEditorBuilder("test");

        expect(preset.applied).toBe(false);

        builder.usePreset(preset);

        expect(preset.applied).toBe(true);
    });

    it("should return builder when using preset", () => {
        const preset = new FakeEditorPreset();
        const builder = new DefaultModuloEditorBuilder("test");

        const result = builder.usePreset(preset);

        expect(result).toBe(builder);
    });

    it("should return builder when using withDomResolver", () => {
        const builder = new DefaultModuloEditorBuilder("test");
        const resolver = new FakeEditorDomResolver();

        const result = builder.withDomResolver(resolver);

        expect(result).toBe(builder);
    });

    it("should return builder when using withInput", () => {
        const builder = new DefaultModuloEditorBuilder("test");

        const result = builder.withInput({} as any);

        expect(result).toBe(builder);
    });

    it("should return builder when using withOutput", () => {
        const builder = new DefaultModuloEditorBuilder("test");

        const result = builder.withOutput({} as any);

        expect(result).toBe(builder);
    });

    it("should return builder when using withTextareaBridge", () => {
        const builder = new DefaultModuloEditorBuilder("test");

        const result = builder.withTextareaBridge({} as any);

        expect(result).toBe(builder);
    });

    it("should return builder when using withMarkdown", () => {
        const builder = new DefaultModuloEditorBuilder("test");

        const result = builder.withMarkdown({} as any);

        expect(result).toBe(builder);
    });

    it("should return builder when using withPlugins", () => {
        const builder = new DefaultModuloEditorBuilder("test");

        const result = builder.withPlugins([] as any);

        expect(result).toBe(builder);
    });
});