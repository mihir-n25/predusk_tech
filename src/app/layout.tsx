import type { Metadata } from "next";
import { Inter_Tight } from 'next/font/google';
import "./globals.css";
import { FloatingNav } from "@/components/ui/floating-navbar";
import ChatBot from "@/components/layout/Chatbot";

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], 
  variable: '--font-inter-tight', 
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.Mirofy.in"),
  title: "Mirofy | Mihir Nebani - Frontend Developer & Full-Stack Engineer",
  description:
    "Portfolio of Mihir Nebani at Mirofy. Skilled in Next.js, React, TypeScript, Node.js, and building scalable full-stack applications. Explore projects in SaaS, APIs, automation, and real-time apps.",
  keywords: [
    "Mihir Nebani",
    "Mirofy",
    "Frontend Developer",
    "Full-Stack Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Engineer",
    "Node.js Developer",
    "MERN Developer",
    "Portfolio Mirofy",
    "Mirofy Developer Projects",
    "Web App Development",
    "SaaS Developer India",
    "OpenAI API Projects",
    "Mirofy Portfolio",
  ],
  authors: [{ name: "Mihir Nebani", url: "https://z1-tech-zeta.vercel.app/" }],
  icons: {
    icon: "/postlab_logo.png", 
    shortcut: "/postlab_logo.png",
    apple: "/postlab_logo.png",
  },
  openGraph: {
    title: "Mirofy | Mihir Nebani - Portfolio & Projects",
    description:
      "Discover Mihir Nebani’s portfolio at Mirofy — expertise in frontend & full-stack development with Next.js, React, Node.js, TypeScript, and modern SaaS solutions.",
    images: ["/postlab_logo.png"],
    url: "https://z1-tech-zeta.vercel.app/",
    siteName: "Mirofy",
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
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "AI Image",
      link: "/create-image",
    },
    {
      name: "Chat",
      link: "/",
    },
    {
      name: "Profile",
      link: "/profile",
    },
  ];
  return (
    <html lang="en">
      <body
        className={`${interTight.className} antialiased bg-[#f8f8f2] relative`}
      >
       

        <FloatingNav navItems={navItems} />
        <ChatBot />
        {children}
      </body>
    </html>
  );
}