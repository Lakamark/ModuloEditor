import type {EditorScrollSection} from "./EditorScrollSection";

/**
 * Analyzes editor content and produces logical scroll sections.
 *
 * Implementations may use different strategies to identify sections,
 * such as Markdown headings, document blocks, or custom syntax.
 */
export interface EditorScrollSectionAnalyzer {
    /**
     * Creates scroll sections from raw editor content.
     *
     * @param value - Raw editor content.
     * @returns Generated scroll sections.
     */
    analyze(value: string): readonly EditorScrollSection[];
}