import { describe, expect, it } from "vitest";
import { normalizeTextareaContent } from "../../../src/textarea";

describe("normalizeTextareaContent", () => {
    it("removes common textarea indentation", () => {
        const value = `
        # Hello ModuloEditor

        ## This is a development entry point.
        Lorem ipsum
`;

        expect(normalizeTextareaContent(value)).toBe(
            "# Hello ModuloEditor\n\n## This is a development entry point.\nLorem ipsum\n"
        );
    });

    it("preserves trailing whitespace", () => {
        const value = "# Hello\n\n";

        expect(normalizeTextareaContent(value)).toBe("# Hello\n\n");
    });
});