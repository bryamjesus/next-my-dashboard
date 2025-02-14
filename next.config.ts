import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // TODO: Es para next permita cargar imagenes de otros sitios
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        
      }
    ],
  },
  /* config options here */
};

export default nextConfig;
