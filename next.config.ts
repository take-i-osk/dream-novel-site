import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const rootDir = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  agentRules: false,
  trailingSlash: true,
  typedRoutes: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    strictRouteTypes: false,
  },
  turbopack: {
    root: rootDir,
  },
};

export default nextConfig;
