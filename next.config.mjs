/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  experimental: {
    optimizePackageImports: ['framer-motion', '@react-three/drei', '@react-three/fiber'],
  },
};

export default nextConfig;
