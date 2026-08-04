import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { listings } from "../catalog";

export default defineTool({
  name: "get_listing",
  title: "Get listing",
  description: "Get the full details of one public Venditu listing by its id.",
  inputSchema: { id: z.string().describe("Listing id, e.g. '1' or 'f2'.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const listing = listings.find((l) => l.id === id);
    if (!listing) throw new ToolError(`No listing found with id "${id}".`);
    return {
      content: [{ type: "text", text: JSON.stringify(listing, null, 2) }],
      structuredContent: { listing },
    };
  },
});
