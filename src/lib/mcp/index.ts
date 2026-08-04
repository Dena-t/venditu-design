import { defineMcp } from "@lovable.dev/mcp-js";
import searchListingsTool from "./tools/search-listings";
import getListingTool from "./tools/get-listing";
import listCategoriesTool from "./tools/list-categories";
import getDesignSystemTool from "./tools/get-design-system";

export default defineMcp({
  name: "venditu-design-system",
  title: "Venditu Design System",
  version: "0.1.0",
  instructions:
    "Public tools for the Venditu marketplace landing page. Use `list_categories` to browse categories, `search_listings` to find listings by keyword/category, `get_listing` for one listing's details, and `get_design_system` for the brand's design tokens.",
  tools: [searchListingsTool, getListingTool, listCategoriesTool, getDesignSystemTool],
});
