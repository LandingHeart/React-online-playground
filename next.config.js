/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*"
      },
      {
        source: "/api/py/:path*",
        destination:
          process.env.ENV === "development"
            ? "http://127.0.0.1:8000/api/py/:path*"
            : "/api/py/:path*"
      },
      {
        source: "/docs",
        destination:
          process.env.ENV === "development"
            ? "http://127.0.0.1:8000/api/py/docs"
            : "/api/py/docs"
      },
      {
        source: "/openapi.json",
        destination:
          process.env.ENV === "development"
            ? "http://127.0.0.1:8000/api/py/openapi.json"
            : "/api/py/openapi.json"
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
