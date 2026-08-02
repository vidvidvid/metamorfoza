import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package.json in the home directory makes Turbopack infer the
  // wrong workspace root, breaking module resolution — pin it explicitly.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
