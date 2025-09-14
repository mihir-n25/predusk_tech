"use client";

import React, { useEffect } from 'react'
import CreateImageSection from "@/components/features/CreateImage";
import Lenis from "@studio-freight/lenis";
import Footer from "@/components/layout/Footer";



const CreateImage = () => {
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);
  return (
    <div className="bg-[#020617]">
    <CreateImageSection/>
    <Footer />
    </div>
  )
}

export default CreateImage