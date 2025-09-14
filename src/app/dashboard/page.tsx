"use client";

import Footer from "@/components/layout/Footer";
import React from "react";
import CardSections from "@/components/features/CardSection";
import CommunitySection from "@/components/features/Community";
import CreateImageSection from "@/components/features/CreateImage";
import Landing from "@/components/features/Landing";
import Paragraph from "@/components/features/Paragraph";
import Product from "@/components/features/Product";

const Dashboard = () => {
  return (
    <div className="bg-[#020617]">
      <Landing />
      <Paragraph
        builtFor="Developers"
        heading="Mirofy DevKit"
        paragraph="Mirofy brings AI to everyone with its intuitive core features, but for developers seeking precision, flexibility, and control, we created Mirofy DevKit — a professional-grade extension designed to supercharge your workflow with advanced tools and tailored capabilities."
      />
      <Product />
      <CardSections />

      <CommunitySection />
      <Footer />
    </div>
  );
};

export default Dashboard;
