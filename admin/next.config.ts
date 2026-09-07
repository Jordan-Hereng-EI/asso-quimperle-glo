import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces .next/standalone so the Docker image only ships the server
  // bundle and its pruned node_modules, not the whole install.
  output: "standalone",
  experimental: {
    serverActions: {
      // L'upload de photos passe par une Server Action : plusieurs photos de
      // téléphone (5-8 Mo chacune) doivent tenir dans une seule requête.
      bodySizeLimit: "60mb",
    },
  },
};

export default nextConfig;
