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
});