/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "tjzk.replicate.delivery",
      "replicate.delivery",
      "cdn.playground.com",
    ],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://95.217.158.17:5000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
