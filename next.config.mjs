/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xyzstorage.store",
        port: "",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
