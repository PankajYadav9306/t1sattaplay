/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.ibb.co"],
    remotePatterns: [new URL("https://t1satta.in/**")],
  },
};

export default nextConfig;
