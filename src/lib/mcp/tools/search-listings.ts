import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { listings } from "../catalog";

export default defineTool({
  name: "search_listings",
  title: "Search listings",
  description:
    "Search the public Venditu marketplace listings by keyword, category, or featured status.",
  inputSchema: {
    query: z.string().optional().describe("Keyword matched against listing title and location."),
    category: z.string().optional().describe("Category name, e.g. Electronics."),
    featured_only: z.boolean().optional().describe("Return only featured listings."),
    limit: z.number().int().optional().describe("Maximum number of results (default 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, category, featured_only, limit }) => {
    const q = query?.trim().toLowerCase();
    const cat = category?.trim().toLowerCase();
    const max = Math.min(Math.max(limit ?? 10, 1), 50);

    const results = listings
      .filter((l) => (featured_only ? l.featured : true))
      .filter((l) => (cat ? l.category.toLowerCase() === cat : true))
      .filter((l) =>
        q ? l.title.toLowerCase().includes(q) || l.location.toLowerCase().includes(q) : true,
      )
      .slice(0, max);

    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      structuredContent: { count: results.length, results },
    };
  },
});
