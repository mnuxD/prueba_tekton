import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cards.scryfall.io"],
  },
};

export default nextConfig;
