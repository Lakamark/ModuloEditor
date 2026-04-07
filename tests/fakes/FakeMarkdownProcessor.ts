import type { MarkdownProcessor } from "../../src";

export class FakeMarkdownProcessor implements MarkdownProcessor {
    public toHtml(value: string): string {
        return `<p>${value}</p>`;
    }
}