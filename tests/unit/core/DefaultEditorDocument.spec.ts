import {FakeEditorDomInitializer, FakeEditorDomResolver, FakeEditorPreset} from "../../fakes";
import {DefaultModuloEditorBuilder} from "../../../src/core/Builder";
import {expect} from "vitest";

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

        const result = builder.withPlugins([]);

        expect(result).toBe(builder);
    });

    it('should accept a selector', () => {
        const root = document.createElement('div');
        document.body.append(root);

        const builder = new DefaultModuloEditorBuilder(root);
        const textarea = document.createElement('textarea');
        textarea.id = 'content';

        document.body.append(textarea);

        const result = builder.fromTextarea('#content');

        expect(result).toBe(builder);
    });

    it('should accept a textarea input', () => {
        const root = document.createElement('div');
        document.body.append(root);

        const builder = new DefaultModuloEditorBuilder(root);
        const textarea = document.createElement('textarea');
        textarea.id = 'content';

        document.body.append(textarea);

        const result = builder.fromTextarea(textarea);

        expect(result).toBe(builder);
    });

    it('should throw when selector does not reference a textarea', () => {
        const root = document.createElement('div');
        document.body.append(root);

        const builder = new DefaultModuloEditorBuilder(root);
        const inputElement = document.createElement('input');
        inputElement.id = 'content';

        document.body.append(inputElement);

        expect(() => {
            builder.fromTextarea('#content');
        }).toThrow('Element #content is not a textarea')
    });

    it('should throw when element is not a textarea', () => {
        const root = document.createElement('div');
        document.body.append(root);

        const builder = new DefaultModuloEditorBuilder(root);

        expect(() => {
            builder.fromTextarea('#content');
        }).toThrow('No element found for selector #content')
    });

    it('should initialize dom from textarea', () => {
        const root =  document.createElement('div');
        const textarea = document.createElement('textarea');
        textarea.id = 'content';

        document.body.append(textarea);

        const fake = new FakeEditorDomInitializer();

        const builder = new DefaultModuloEditorBuilder(root);
        builder.fromTextarea(textarea)
            .withDomInitializer(fake)
            .withInput({} as any)
            .withInput({} as any)
            .withMarkdown({} as any)
            .withOutput({} as any)
        builder.build();

        expect(fake.called).toBe(true);
        expect(fake.receivedTextarea).toBe(textarea);

    });
});