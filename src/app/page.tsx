"use client";
import React, { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "../components/layout/Sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconMessage,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import PromptEditor from "@/components/features/PromptEditor";
import { Image } from "lucide-react";
import Lenis from "@studio-freight/lenis";
import { Logo, LogoIcon } from "@/components/features/Logo";

export default function HomePage() {
  // ← must be default export
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Create Image",
      href: "/create-image",
      icon: (
        <Image className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onClick: () => setIsPopupOpen(true),
    },
  ];

  const [open, setOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-10 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={link.onClick ? link.onClick : undefined}
                />
              ))}
            </div>
            <div className="my-16">
              <div className="mt-2 flex flex-col gap-2">
                {["How to use API?", "Explain JWT", "Generate SQL query"].map(
                  (chat, idx) => (
                    <SidebarLink
                      key={idx}
                      link={{
                        label: chat,
                        href: "#",
                        icon: (
                          <IconMessage className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                        ),
                      }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Mihir Nebani",
                href: "#",
                icon: (
                  <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {isPopupOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsPopupOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-900/95 backdrop-blur-xl border border-neutral-200 dark:border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Select Theme Preferences
              </h2>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Theme Preference
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={() => handleThemeChange("light")}
                  className={cn(
                    "px-4 py-2 rounded-lg border transition-colors",
                    theme === "light"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-white text-black dark:bg-gray-800 dark:text-white"
                  )}
                >
                  Light
                </button>
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={cn(
                    "px-4 py-2 rounded-lg border transition-colors",
                    theme === "dark"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-white text-black dark:bg-gray-800 dark:text-white"
                  )}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <PromptEditor />
    </div>
  );
}
