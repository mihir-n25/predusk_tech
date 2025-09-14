"use client";
import { useEffect, useRef, useState } from "react";

export default function BuiltForSection() {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const words = ["Optimization", "Collaboration", "Automation"];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (containerTop <= 0 && containerTop > -containerHeight + windowHeight) {
        const scrollProgress =
          Math.abs(containerTop) / (containerHeight - windowHeight);
        const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);
        setProgress(clampedProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentIndex = progress * (words.length - 1);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full z-[9999]">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          style={{ zIndex: -1 }}
        >
          <source
            src="/ai_video.mp4"
            type="video/mp4"
          />
        </video>

        {/* Text overlay */}
        <div className="absolute inset-0 flex items-center justify-start">
          <div className="pl-12 md:pl-16 lg:pl-20 flex items-baseline">
            {/* Static part */}
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mr-6">
              Ensures
            </h1>

            {/* Scrolling words */}
            <div className="flex flex-col relative">
              {words.map((word, index) => {
                // Distance from active word
                const distance = Math.abs(currentIndex - index);

                // Fade inactive words
                const opacity = 1 - Math.min(distance * 0.6, 0.8);

                // Vertical offset (push words smoothly up/down)
                const offsetY = (index - currentIndex) * 1.2; // 1.2em spacing

                return (
                  <div
                    key={index}
                    className="absolute left-0 -bottom-5 right-0 text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight transition-all duration-300 ease-out"
                    style={{
                      transform: `translateY(${offsetY}em)`,
                      opacity,
                      color: distance < 0.5 ? "white" : "#9ca3af", // white for active, gray for others
                    }}
                  >
                    {word}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}