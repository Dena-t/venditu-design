import { defineTool } from "@lovable.dev/mcp-js";
import { categories } from "../catalog";

export default defineTool({
  name: "list_categories",
  title: "List categories",
  description: "List the public Venditu marketplace categories and their listing counts.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(categories, null, 2) }],
    structuredContent: { categories },
  }),
});
