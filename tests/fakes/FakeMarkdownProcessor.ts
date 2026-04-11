import type { MarkdownProcessor } from "../../src";

export class FakeMarkdownProcessor implements MarkdownProcessor {
    public lastValue: string | null = null;

    public toHtml(value: string): string {
        this.lastValue = value;
        return `<p>${value}</p>`;
    }
}