/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.ENV === "development"
            ? "http://127.0.0.1:8000/api/:path*" // Proxy to local FastAPI server
            : "/api/:path*" // In production, this is handled by vercel.json
      }
    ];
  },

  headers: async () => {
    return [
      {
        source: "/:path*", // Apply to all paths
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp"
          },
          {
            key: "Cross-Origin-Opener-Policy", // Corrected capitalization
            value: "same-origin"
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
