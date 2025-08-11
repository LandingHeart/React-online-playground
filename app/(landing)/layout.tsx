import React from "react";

const Header = () => (
  <header className="bg-gray-900 text-white shadow-md">
    <nav className="container mx-auto flex items-center justify-between px-6 py-4">
      <div className="text-2xl font-bold">
        <a href="/">Codenan</a>
      </div>
      <div className="space-x-6">
        <a href="#features" className="hover:text-indigo-400">
          Features
        </a>
        <a
          href="/projects"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-bold text-white transition duration-300 hover:bg-indigo-700"
        >
          Go to App
        </a>
      </div>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-900 py-8 text-center text-gray-500">
    <p>&copy; {new Date().getFullYear()} Codenan. All rights reserved.</p>
  </footer>
);

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
