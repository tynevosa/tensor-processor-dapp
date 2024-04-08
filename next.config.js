/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "http://135.181.241.81:5000/api/:path*", // Proxy to Backend
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  