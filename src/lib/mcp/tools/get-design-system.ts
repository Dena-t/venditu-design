import { defineTool } from "@lovable.dev/mcp-js";
import { designTokens } from "../catalog";

export default defineTool({
  name: "get_design_system",
  title: "Get design system",
  description:
    "Return the public Venditu design system tokens (colors, typography, spacing scale).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(designTokens, null, 2) }],
    structuredContent: { tokens: designTokens },
  }),
});
