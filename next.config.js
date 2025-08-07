/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        // This rule handles all /api requests in development, proxying to your local FastAPI
        source: "/:path*",
        destination: "http://127.0.0.1:8000/:path*"
      },
      // The previous /api/py/:path* rule is removed as it's no longer needed.
      {
        // Route for FastAPI documentation
        source: "/docs",
        destination:
          process.env.ENV === "development"
            ? "http://127.0.0.1:8000/docs" // Direct to local docs in dev
            : "/api/docs" // Route to Vercel hosted FastAPI docs in production
      },
      {
        // Route for FastAPI OpenAPI spec
        source: "/openapi.json",
        destination:
          process.env.ENV === "development"
            ? "http://127.0.0.1:8000/openapi.json" // Direct to local spec in dev
            : "/api/openapi.json" // Route to Vercel hosted FastAPI spec in production
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
