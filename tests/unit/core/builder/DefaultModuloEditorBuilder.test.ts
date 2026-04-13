import { describe, expect, it } from "vitest";
import { DefaultModuloEditorBuilder } from "../../../../src/core/Builder";
import {
    FakeEditorDomInitializer,
    FakeEditorDomResolver,
    FakeEditorPreset, FakeTextareaBridge
} from "../../../fakes";
import {DefaultEditorDomInitializer} from "../../../../src";

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

    describe('dom initializer', () => {
        it("should initialize DOM when textarea and initializer are provided", () => {
            const textarea = document.createElement('textarea');
            textarea.id = 'content';

            document.body.append(textarea);

            const initializer = new FakeEditorDomInitializer();

            const builder = new DefaultModuloEditorBuilder("ignored-root")
                .fromTextarea(textarea)
                .withDomInitializer(initializer)
                .withInput({} as any)
                .withOutput({} as any)
                .withMarkdown({} as any);

            builder.build();

            expect(initializer.called).toBe(true);
            expect(initializer.receivedTextarea).toBe(textarea);

        });

        it("should call initializer only once", () => {
            const textarea = document.createElement("textarea");
            document.body.append(textarea);

            const initializer = new FakeEditorDomInitializer();

            const builder = new DefaultModuloEditorBuilder("test")
                .fromTextarea(textarea)
                .withDomInitializer(initializer)
                .withInput({} as any)
                .withOutput({} as any)
                .withMarkdown({} as any);

            builder.build();

            expect(initializer.calledCount).toBe(1);
        });

        it("should initialize editor from textarea using dom initializer", () => {
            const textarea = document.createElement("textarea");
            textarea.id = "content";

            document.body.append(textarea);

            const builder = new DefaultModuloEditorBuilder("ignored")
                .fromTextarea(textarea)
                .withDomInitializer(new DefaultEditorDomInitializer())
                .withInput({} as any)
                .withOutput({} as any)
                .withMarkdown({} as any);

            const editor = builder.build();

            expect(editor).toBeDefined();
        });
    });

    it("should build from textarea without explicit root when a dom initializer is configured", () => {
        const textarea = document.createElement("textarea");
        document.body.append(textarea);

        const builder = new DefaultModuloEditorBuilder()
            .fromTextarea(textarea)
            .withDomInitializer(new DefaultEditorDomInitializer())
            .withInput({} as any)
            .withOutput({} as any)
            .withMarkdown({} as any);

        expect(() => builder.build()).not.toThrow();
    });

    it("should throw when no root is provided and no dom initializer is configured", () => {
        const builder = new DefaultModuloEditorBuilder()
            .withInput({} as any)
            .withOutput({} as any)
            .withMarkdown({} as any);

        expect(() => builder.build()).toThrow(
            "ModuloEditorBuilder requires a root element when no DOM initializer is configured."
        );
    });

    it("should mount textarea bridge with resolved textarea when available", () => {
        const textarea = document.createElement("textarea");
        document.body.append(textarea);

        const textareaBridge = new FakeTextareaBridge();

        const builder = new DefaultModuloEditorBuilder()
            .fromTextarea(textarea)
            .withDomInitializer(new FakeEditorDomInitializer())
            .withTextareaBridge(textareaBridge)
            .withInput({} as any)
            .withOutput({} as any)
            .withMarkdown({} as any);

        builder.build();

        expect(textareaBridge.mountedTextarea).toBe(textarea);
    });

    it("should mount textarea bridge with textarea returned by dom initializer", () => {
        const sourceTextarea = document.createElement("textarea");
        document.body.append(sourceTextarea);

        const resolvedTextarea = document.createElement("textarea");

        const initializer = new FakeEditorDomInitializer();
        initializer.customResult = {
            root: document.createElement("div"),
            textarea: resolvedTextarea,
        };

        const textareaBridge = new FakeTextareaBridge();

        const builder = new DefaultModuloEditorBuilder()
            .fromTextarea(sourceTextarea)
            .withDomInitializer(initializer)
            .withTextareaBridge(textareaBridge)
            .withInput({} as any)
            .withOutput({} as any)
            .withMarkdown({} as any);

        builder.build();

        expect(textareaBridge.mountedTextarea).toBe(resolvedTextarea);
    });
});