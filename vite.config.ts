import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

type ViteConfigArgs = {
  mode: string;
  command: string;
};

export default (args: ViteConfigArgs) => {
  const generateScopedName =
    args.mode === "development" ? "__Lync___[local]___[hash:base64:5]" : "__Lync___[hash:base64:5]";

  return defineConfig({
    plugins: [react()],
    css: {
      modules: {
        localsConvention: "camelCase",
        generateScopedName,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
      },
    },
  });
};
