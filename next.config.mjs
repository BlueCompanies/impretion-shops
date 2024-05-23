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
};

export default nextConfig;
