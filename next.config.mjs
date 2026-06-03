/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactCompiler: true,
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
  images: {
    unoptimized: true,
  },
  basePath: "/weflow-assignment",
  assetPrefix: "/weflow-assignment/",
};

export default nextConfig;
