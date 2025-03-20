import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wb80ftx970.ufs.sh",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "utfs.io", // Agregar este dominio
        port: "",
        pathname: "/**",
      }
    ]
  }
};

export default nextConfig;
