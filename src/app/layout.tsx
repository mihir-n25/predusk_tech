import type { Metadata } from "next";
import { Inter_Tight } from 'next/font/google';
import "./globals.css";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import PostLabsFooter from "@/components/layout/Footer";
import ChatBot from "@/components/layout/Chatbot";

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], 
  variable: '--font-inter-tight', 
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.postlabs.in"),
  title: "PostLabs | Mihir Nebani - Frontend Developer & Full-Stack Engineer",
  description:
    "Portfolio of Mihir Nebani at PostLabs. Skilled in Next.js, React, TypeScript, Node.js, and building scalable full-stack applications. Explore projects in SaaS, APIs, automation, and real-time apps.",
  keywords: [
    "Mihir Nebani",
    "PostLabs",
    "Frontend Developer",
    "Full-Stack Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Engineer",
    "Node.js Developer",
    "MERN Developer",
    "Portfolio PostLabs",
    "PostLabs Developer Projects",
    "Web App Development",
    "SaaS Developer India",
    "OpenAI API Projects",
    "PostLabs Portfolio",
  ],
  authors: [{ name: "Mihir Nebani", url: "https://z1-tech-zeta.vercel.app/" }],
  icons: {
    icon: "/postlab_logo.png", 
    shortcut: "/postlab_logo.png",
    apple: "/postlab_logo.png",
  },
  openGraph: {
    title: "PostLabs | Mihir Nebani - Portfolio & Projects",
    description:
      "Discover Mihir Nebani’s portfolio at PostLabs — expertise in frontend & full-stack development with Next.js, React, Node.js, TypeScript, and modern SaaS solutions.",
    images: ["/postlab_logo.png"],
    url: "https://z1-tech-zeta.vercel.app/",
    siteName: "PostLabs",
    locale: "en_IN",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    {
      name: "About",
      link: "/",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];
  return (
    <html lang="en">
      <body
        className={`${interTight.className} antialiased bg-[#f8f8f2] relative`}
      >
        <div className="floating-grid">
          <div className="floating-grid-col"></div>
          <div className="floating-grid-col"></div>
          <div className="floating-grid-col"></div>
        </div>

        {/* <FloatingNav navItems={navItems} /> */}
        {/* <ChatBot /> */}
        {children}
        {/* <PostLabsFooter /> */}
      </body>
    </html>
  );
}