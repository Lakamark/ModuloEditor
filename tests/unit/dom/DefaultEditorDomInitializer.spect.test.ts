import { describe, expect, it } from "vitest";
import { DefaultEditorDomInitializer } from "../../../src";

describe("DefaultEditorDomInitializer", () => {
    it("should create a root element with the editor data attribute", () => {
        const textarea = document.createElement("textarea");
        document.body.append(textarea);

        const initializer = new DefaultEditorDomInitializer();

        const result = initializer.initialize(textarea);

        expect(result.root).toBeInstanceOf(HTMLElement);
        expect(result.root.hasAttribute("data-mo-editor")).toBe(true);
    });

    it("should create header, toolbar, body, input, preview, footer and status elements", () => {
        const textarea = document.createElement("textarea");
        document.body.append(textarea);

        const initializer = new DefaultEditorDomInitializer();

        const result = initializer.initialize(textarea);

        expect(result.root.querySelector("[data-mo-editor-header]")).toBeInstanceOf(HTMLElement);
        expect(result.root.querySelector("[data-mo-editor-toolbar]")).toBeInstanceOf(HTMLElement);
        expect(result.root.querySelector("[data-mo-editor-body]")).toBeInstanceOf(HTMLElement);
        expect(result.root.querySelector("[data-mo-editor-input]")).toBeInstanceOf(HTMLElement);
        expect(result.root.querySelector("[data-mo-editor-preview]")).toBeInstanceOf(HTMLElement);
        expect(result.root.querySelector("[data-mo-editor-footer]")).toBeInstanceOf(HTMLElement);
        expect(result.root.querySelector("[data-mo-editor-status]")).toBeInstanceOf(HTMLElement);
    });

    it("should move the textarea inside the generated root", () => {
        const wrapper = document.createElement("div");
        const textarea = document.createElement("textarea");

        wrapper.append(textarea);
        document.body.append(wrapper);

        const initializer = new DefaultEditorDomInitializer();

        const result = initializer.initialize(textarea);

        expect(result.root.contains(textarea)).toBe(true);
    });

    it("should hide the textarea", () => {
        const textarea = document.createElement("textarea");
        document.body.append(textarea);

        const initializer = new DefaultEditorDomInitializer();

        const result = initializer.initialize(textarea);

        expect(result.textarea.hidden).toBe(true);
    });

    it("should add the editor textarea data attribute to the textarea", () => {
        const textarea = document.createElement("textarea");
        document.body.append(textarea);

        const initializer = new DefaultEditorDomInitializer();

        const result = initializer.initialize(textarea);

        expect(result.textarea.hasAttribute("data-mo-editor-textarea")).toBe(true);
    });

    it("should return the generated root and the original textarea", () => {
        const textarea = document.createElement("textarea");
        document.body.append(textarea);

        const initializer = new DefaultEditorDomInitializer();

        const result = initializer.initialize(textarea);

        expect(result.root).toBeInstanceOf(HTMLElement);
        expect(result.textarea).toBe(textarea);
    });

    it("should insert the generated root before the original textarea position", () => {
        const wrapper = document.createElement("div");
        const before = document.createElement("p");
        const textarea = document.createElement("textarea");
        const after = document.createElement("span");

        wrapper.append(before, textarea, after);
        document.body.append(wrapper);

        const initializer = new DefaultEditorDomInitializer();

        const result = initializer.initialize(textarea);

        expect(wrapper.children[0]).toBe(before);
        expect(wrapper.children[1]).toBe(result.root);
        expect(wrapper.children[2]).toBe(after);
    });

    it("should apply default CSS classes to generated elements", () => {
        const textarea = document.createElement("textarea");
        document.body.append(textarea);

        const initializer = new DefaultEditorDomInitializer();

        const result = initializer.initialize(textarea);

        expect(result.root.className).toBe("mo-editor");
        expect(result.root.querySelector("[data-mo-editor-header]")?.className).toBe("mo-editor__header");
        expect(result.root.querySelector("[data-mo-editor-toolbar]")?.className).toBe("mo-editor__toolbar");
        expect(result.root.querySelector("[data-mo-editor-body]")?.className).toBe("mo-editor__body");
        expect(result.root.querySelector("[data-mo-editor-input]")?.className).toBe("mo-editor__input");
        expect(result.root.querySelector("[data-mo-editor-preview]")?.className).toBe("mo-editor__preview");
        expect(result.root.querySelector("[data-mo-editor-footer]")?.className).toBe("mo-editor__footer");
        expect(result.root.querySelector("[data-mo-editor-status]")?.className).toBe("mo-editor__status");
        expect(result.textarea.className).toBe("mo-editor__textarea");
    });

    it("should allow overriding CSS classes", () => {
        const textarea = document.createElement("textarea");
        document.body.append(textarea);

        const initializer = new DefaultEditorDomInitializer({
            classes: {
                root: "custom-root",
                toolbar: "custom-toolbar",
                input: "custom-input",
                preview: "custom-preview",
                textarea: "custom-textarea",
            }
        });

        const result = initializer.initialize(textarea);

        expect(result.root.className).toBe("custom-root");
        expect(result.root.querySelector("[data-mo-editor-toolbar]")?.className).toBe("custom-toolbar");
        expect(result.root.querySelector("[data-mo-editor-input]")?.className).toBe("custom-input");
        expect(result.root.querySelector("[data-mo-editor-preview]")?.className).toBe("custom-preview");
        expect(result.textarea.className).toBe("custom-textarea");

        expect(result.root.querySelector("[data-mo-editor-header]")?.className).toBe("mo-editor__header");
        expect(result.root.querySelector("[data-mo-editor-body]")?.className).toBe("mo-editor__body");
        expect(result.root.querySelector("[data-mo-editor-footer]")?.className).toBe("mo-editor__footer");
        expect(result.root.querySelector("[data-mo-editor-status]")?.className).toBe("mo-editor__status");
    });
});