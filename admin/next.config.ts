import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces .next/standalone so the Docker image only ships the server
  // bundle and its pruned node_modules, not the whole install.
  output: "standalone",
};

export default nextConfig;
