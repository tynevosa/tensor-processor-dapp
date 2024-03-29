/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: config => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
      },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://135.181.241.81:5000/api/:path*',
            },
        ];
    }
};

export default nextConfig;
