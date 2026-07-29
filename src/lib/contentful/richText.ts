/**
 * Minimal Rich Text → plain string helper.
 * Good enough for body copy that components currently render as <p>{string}</p>.
 * Upgrade to @contentful/rich-text-react-renderer when you need links/lists in UI.
 */

type RtNode = {
  nodeType?: string;
  value?: string;
  content?: RtNode[];
};

export function richTextToPlain(doc: unknown): string {
  if (!doc || typeof doc !== "object") return "";
  const node = doc as RtNode;
  if (node.nodeType === "text") return node.value ?? "";
  if (!Array.isArray(node.content)) return "";

  const parts: string[] = [];
  for (const child of node.content) {
    const t = richTextToPlain(child);
    if (!t) continue;
    if (
      child.nodeType === "paragraph" ||
      child.nodeType === "heading-1" ||
      child.nodeType === "heading-2" ||
      child.nodeType === "heading-3"
    ) {
      parts.push(t);
    } else {
      parts.push(t);
    }
  }
  return parts.join("\n\n").trim();
}
