import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/hire-talent',
        destination: '/it-staffing',
        permanent: false,
      },
      {
        source: '/recruitment',
        destination: '/it-staffing',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
