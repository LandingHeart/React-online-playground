"use client";

const HeroSection = () => (
  <section className="py-20 text-center">
    <div className="container mx-auto px-6">
      <h1 className="mb-4 text-5xl font-extrabold leading-tight md:text-6xl">
        The Ultimate Playground for React Developers
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
        Build, test, and share your React components and projects in a live,
        collaborative environment powered by AI. No setup required.
      </p>
      <a
        href="/projects"
        className="rounded-lg bg-indigo-600 px-8 py-4 text-lg font-bold text-white transition duration-300 hover:bg-indigo-700"
      >
        Start Coding Now
      </a>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section id="features" className="bg-gray-900 py-20">
    <div className="container mx-auto px-6">
      <h2 className="mb-12 text-center text-3xl font-bold">
        Everything You Need in One Place
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-lg bg-gray-800 p-8">
          <h3 className="mb-2 text-xl font-bold">Live Previews</h3>
          <p className="text-gray-400">
            See your UI update in real-time as you type. Perfect for rapid
            prototyping and debugging.
          </p>
        </div>
        <div className="rounded-lg bg-gray-800 p-8">
          <h3 className="mb-2 text-xl font-bold">Full-Stack Power</h3>
          <p className="text-gray-400">
            Run Node.js servers and install any npm package with our integrated
            WebContainer technology.
          </p>
        </div>
        <div className="rounded-lg bg-gray-800 p-8">
          <h3 className="mb-2 text-xl font-bold">AI Assistance</h3>
          <p className="text-gray-400">
            Get intelligent suggestions, code completion, and bug fixes from
            your AI coding partner.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const CtaSection = () => (
  <section className="py-20 text-center">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold mb-4">Ready to Build?</h2>
      <p className="text-gray-400 mb-8 text-lg">
        Join thousands of developers building amazing things on Codenan.
      </p>
      <a
        href="/projects"
        className="rounded-lg bg-indigo-600 px-8 py-4 text-lg font-bold text-white transition duration-300 hover:bg-indigo-700"
      >
        Get Started for Free
      </a>
    </div>
  </section>
);

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
    </>
  );
}
