import type {MarkdownParser} from "../contracts";
import {marked} from "marked";

export class MarkedMarkdownParser implements MarkdownParser {
    public parse(markdown: string): string {
        return marked.parse(markdown) as string;
    }
}