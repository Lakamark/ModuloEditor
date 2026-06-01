/**
 * Normalizes initial textarea content.
 *
 * Browsers preserve indentation inside <textarea> elements.
 * When Markdown examples are indented in HTML source code,
 * headings may be interpreted as code blocks.
 *
 * This helper removes the common leading indentation from
 * textarea content before the initial editor render.
 *
 * Note:
 * This normalization is intended only for textarea-based
 * initialization and should not be applied to user content
 * loaded from external sources such as databases or APIs.
 */
export function normalizeTextareaContent(value: string): string {
    const content = value.replace(/^\r?\n/, "");
    const lines = content.split(/\r?\n/);

    const indents = lines
        .filter((line) => line.trim().length > 0)
        .map((line) => line.match(/^[ \t]*/)?.[0].length ?? 0);

    if (indents.length === 0) {
        return content;
    }

    const minIndent = Math.min(...indents);

    return lines
        .map((line) => line.slice(minIndent))
        .join("\n").trimStart();
}