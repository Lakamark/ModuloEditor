/**
 * Removes Markdown heading markers from a line.
 */
export function normalizeHeadingLine(
    value: string
): string {
    return value.replace(/^#{1,6}\s*/, "");
}