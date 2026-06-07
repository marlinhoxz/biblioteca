
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-projeto-orpin.vercel.app",
      },
      {
        protocol: "https",
        hostname: "cdn.akamai.steamstatic.com",
      }
    ],
  },
};

module.exports = nextConfig;