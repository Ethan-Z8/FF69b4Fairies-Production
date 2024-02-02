// vite.config.ts
import { defineConfig } from "file:///C:/Users/ezhon/WebstormProjects/FF69b4Fairies-Production/.yarn/__virtual__/vite-virtual-e439e57f48/0/cache/vite-npm-4.5.1-567bbcf9ff-2ea9c030a5.zip/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/ezhon/WebstormProjects/FF69b4Fairies-Production/.yarn/__virtual__/@vitejs-plugin-react-swc-virtual-34362bd81b/0/cache/@vitejs-plugin-react-swc-npm-3.5.0-750c0d5a74-ca3315e200.zip/node_modules/@vitejs/plugin-react-swc/index.mjs";
import eslint from "file:///C:/Users/ezhon/WebstormProjects/FF69b4Fairies-Production/.yarn/__virtual__/vite-plugin-eslint-virtual-1f4e08d8c3/0/cache/vite-plugin-eslint-npm-1.8.1-844ad445f5-65598893e2.zip/node_modules/vite-plugin-eslint/dist/index.mjs";
var vite_config_default = defineConfig({
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT),
    proxy: {
      "/api": process.env.BACKEND_SOURCE + ":" + process.env.BACKEND_PORT,
    },
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: "build",
  },
  plugins: [react(), eslint()],
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxlemhvblxcXFxXZWJzdG9ybVByb2plY3RzXFxcXEZGNjliNEZhaXJpZXMtUHJvZHVjdGlvblxcXFxhcHBzXFxcXGZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxlemhvblxcXFxXZWJzdG9ybVByb2plY3RzXFxcXEZGNjliNEZhaXJpZXMtUHJvZHVjdGlvblxcXFxhcHBzXFxcXGZyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9lemhvbi9XZWJzdG9ybVByb2plY3RzL0ZGNjliNEZhaXJpZXMtUHJvZHVjdGlvbi9hcHBzL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IGVzbGludCBmcm9tIFwidml0ZS1wbHVnaW4tZXNsaW50XCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6IHtcclxuICAgIHByZXNlcnZlU3ltbGlua3M6IHRydWUsXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxyXG4gICAgcG9ydDogcGFyc2VJbnQoPHN0cmluZz5wcm9jZXNzLmVudi5QT1JUKSxcclxuICAgIHByb3h5OiB7XHJcbiAgICAgIFwiL2FwaVwiOiBwcm9jZXNzLmVudi5CQUNLRU5EX1NPVVJDRSArIFwiOlwiICsgcHJvY2Vzcy5lbnYuQkFDS0VORF9QT1JULFxyXG4gICAgfSxcclxuICAgIHdhdGNoOiB7XHJcbiAgICAgIHVzZVBvbGxpbmc6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogXCJidWlsZFwiLFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW3JlYWN0KCksIGVzbGludCgpXSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1osU0FBUyxvQkFBb0I7QUFDL2EsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUduQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxrQkFBa0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTSxTQUFpQixRQUFRLElBQUksSUFBSTtBQUFBLElBQ3ZDLE9BQU87QUFBQSxNQUNMLFFBQVEsUUFBUSxJQUFJLGlCQUFpQixNQUFNLFFBQVEsSUFBSTtBQUFBLElBQ3pEO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxZQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUM3QixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=