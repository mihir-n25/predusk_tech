"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';
import "../../styles/paragraph.scss";

interface ParagraphProps {
  builtFor: string;
  heading: string;
  paragraph: string;
}

export default function Paragraph({ builtFor, heading, paragraph }: ParagraphProps) {
  const container = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress: paraProgress } = useScroll({
    target: container,
    offset: ["start 0.7", "start 0.25"]
  });

  const ref = useRef(null);
  const { scrollYProgress: headingProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "center center"],
  });

  const width = useTransform(headingProgress, [0, 1], ["0%", "100%"]);

  const words = paragraph.split(" ");
  return (
    <div className="">
      <div
        ref={ref}
        className="flex flex-col items-center justify-center gap-6 py-20 text-white"
      >
        <div className="flex items-center gap-4 text-4xl md:text-6xl font-bold uppercase">
          <span className="italic">Built for</span>

          <div className="relative overflow-hidden">
            <motion.div
              style={{ width }}
              className="absolute left-0 top-0 h-full bg-white rounded-md"
            />
            <span className="relative text-[#020617] px-3">{builtFor}</span>
          </div>
        </div>

          <div className="flex items-center gap-3 text-4xl md:text-6xl font-extrabold uppercase">
          <motion.div
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Image
              src="https://assets-global.website-files.com/64f82d230ea749e53feab014/6500a61869d6ab483c2c8fdf_star.svg"
              alt="star"
              width={60}
              height={60}
            />
          </motion.div>
          <span>{heading}</span>
        </div>
      </div>

      {/* Paragraph animation */}
      <div
        style={{
          position: "relative",
          width: "100%",
          padding: "10px 0",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <p
          ref={container}
          className="paragraphAnim"
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={paraProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;
  return (
    <span className="word">
      {children.split("").map((char, i) => {
        const start = range[0] + i * step;
        const end = range[0] + (i + 1) * step;
        return (
          <Char key={`c_${i}`} progress={progress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
      &nbsp;
    </span>
  );
};

interface CharProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Char = ({ children, progress, range }: CharProps) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span>
      <span className="shadow">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};
