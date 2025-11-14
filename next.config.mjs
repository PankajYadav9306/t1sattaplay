/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.ibb.co", 'cdn.prod.website-files.com'],
    remotePatterns: [new URL("https://t1satta.in/**")],
  },
};

export default nextConfig;
