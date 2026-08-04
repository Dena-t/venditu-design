import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths(), mcpPlugin()],

  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
});
