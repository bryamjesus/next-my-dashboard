import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Es para next permita cargar imagenes de otros sitios
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
