"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MarQuee from "react-fast-marquee";
import Paragraph from "./Paragraph";
import Link from "next/link";
import { Button } from "../ui/moving-border";

type Props = {};

const rowOneImages = [
  {
    url: "https://i.pinimg.com/564x/e4/e7/e8/e4e7e8f49d9dc2c58767b318e1e85ed1.jpg",
  },
  {
    url: "https://i.pinimg.com/564x/06/93/ac/0693aca12fb4563b19c2741d1ea9a1cd.jpg",
  },
  {
    url: "https://i.pinimg.com/564x/a2/fa/e4/a2fae4ea0c896c726c566feaaad96db2.jpg",
  },
  {
    url: "https://i.pinimg.com/564x/84/ea/28/84ea28ed5ab8733f7296c801849653ee.jpg",
  },
  {
    url: "https://i.pinimg.com/564x/1d/ef/66/1def665f25a2b20f894068c0df92ea40.jpg",
  },
];

const rowTwoImages = [
  {
    url: "https://i.pinimg.com/564x/f5/9a/8b/f59a8b4c8e11b7dd8bfca2c757dbe7a8.jpg",
  },
  {
    url: "https://i.pinimg.com/564x/09/ff/3e/09ff3e776ffdf7f7be5327c075f0b388.jpg",
  },
  {
    url: "https://i.pinimg.com/564x/2e/0f/11/2e0f11bef4afee915d581584cd7e6a0c.jpg",
  },
  {
    url: "https://i.pinimg.com/564x/a0/c9/f5/a0c9f537efc2a6dcbb8994858bb48de5.jpg",
  },
  {
    url: "https://i.pinimg.com/564x/03/36/f5/0336f5dbe566677972bfdaf5d09ff0d7.jpg",
  },
];

const CreateImageSection = (props: Props) => {
  const [mounted, setmounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setmounted(true);
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="w-full pt-28 md:min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-white cursor-pointer font-Monserrat text-4xl py-5 xl:text-7xl 2xl:text-9xl font-[700] text-center xl:leading-[80px] 2xl:leading-[120px] sm:mt-20">
            Transforming Vision <br />
            Into <br />
            <span className="text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500">
              Ai Generated
            </span>
            <br /> Images.
          </h1>
          <div className="md:mt-5">
            <Image
              src="/line.png"
              alt=""
              className="absolute hidden md:block"
              width={2000}
              height={2}
            />
          </div>
          <div className="w-full overflow-hidden  mb-5 md:mb-20 relative">
            <div className="overflow-hidden rotate-[-4deg] z-[0] mt-10 md:mt-[7rem]">
              <MarQuee>
                {rowOneImages.map((i, index) => (
                  <Image
                    src={i.url}
                    key={index}
                    alt=""
                    className="md:m-4 w-[200px] object-cover m-2 md:w-[500px] rounded-[20px]"
                    width={500}
                    height={300}
                  />
                ))}
              </MarQuee>
              <MarQuee>
                {rowTwoImages.map((i, index) => (
                  <Image
                    src={i.url}
                    key={index}
                    alt=""
                    className="md:m-4 w-[200px] m-2 md:w-[500px] rounded-[20px]"
                    width={500}
                    height={300}
                  />
                ))}
              </MarQuee>
            </div>
          </div>
        </div>
      </div>
      <Paragraph
        builtFor="Creators"
        heading="Mirofy Sketch"
        paragraph="Mirofy Sketch turns your ideas into reality on a limitless AI-powered canvas. While Mirofy provides intuitive core AI tools, Sketch lets creators craft custom visuals, experiment freely, and generate unique artwork with precision and ease."
      />

      <div className="mt-32 overflow-hidden w-[100%] md:w-[90%] xl:w-[80%] 2xl:w-[75%] m-auto">
        <div className="w-full bg-contain bg-[url(https://i.pinimg.com/564x/a3/88/d3/a388d3f72859a0357a3468150c885eae.jpg)] relative grid md:grid-cols-2 md:py-20">
          {/* Left Content */}
          <div className="col-span-1 w-full flex justify-center items-center flex-col px-4 gap-y-6">
            <h5
              className={`text-4xl md:text-5xl font-[700] font-Inter text-white text-center mb-3 leading-[55px]`}
            >
              Crafting Futuristic Images With <br/>Mirofy Sketch
            </h5>
            <p
              className={`text-[16px] md:text-[18px] font-[400] text-[#c9c7d2] font-Inter text-center pb-3`}
            >
              AI image generation tools have emerged as powerful resources in
              the realm of digital art and design. These cutting-edge tools
              leverage advanced.
            </p>
            <Link className="mt-1" href={"/"}>
          <Button
            borderRadius="1.75rem"
            className="text-white dark:text-white border-neutral-200 dark:border-slate-800 font-bold text-xl"
          >
            Get Started
          </Button>
        </Link>
          </div>

          {/* Right Image */}
          <div className="col-span-1 my-6 md:mt-0 flex justify-center">
            <Image
              src="https://i.pinimg.com/564x/84/be/5b/84be5b5d6c60d2446b8fa26240956b2e.jpg"
              alt=""
              width={350}
              height={350}
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateImageSection;
