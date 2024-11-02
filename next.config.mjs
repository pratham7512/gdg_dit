/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**', // This allows all HTTPS domains
          },
          {
            protocol: 'http',
            hostname: '**', // This allows all HTTP domains
          }
        ],
      },
};

export default nextConfig;
