/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.ENV === "development"
            ? "http://127.0.0.1:8000/api/:path*"
            : "/api/"
      },
      {
        source: "/docs",
        destination:
          process.env.ENV === "development"
            ? "http://127.0.0.1:8000/docs"
            : "/api/docs"
      },
      {
        source: "/openapi.json",
        destination:
          process.env.ENV === "development"
            ? "http://127.0.0.1:8000/openapi.json"
            : "/api/openapi.json"
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
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin"
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
