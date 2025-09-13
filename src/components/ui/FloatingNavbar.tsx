"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const pathname = usePathname(); 

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed bottom-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-gray-500 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[99999] px-2 py-1 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, idx) => {
          const isActive = pathname === navItem.link; 
          return (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className={cn(
                "relative items-center flex space-x-1 px-6 py-3 text-sm font-medium rounded-full transition-colors",
                isActive
                  ? "bg-white text-gray-500"
                  : "bg-transparent text-white hover:bg-gray-700"
              )}
            >
              <span>{navItem.name}</span>
            </Link>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};