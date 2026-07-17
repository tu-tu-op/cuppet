import type { Metadata } from "next";
import Footer from "../Footer";
import SiteNav from "../SiteNav";
import StorySection from "../StorySection";

export const metadata: Metadata = {
  title: "About Us — Cuppet",
  description: "Why we are building Cuppet and what we are working on now.",
};

export default function AboutPage() {
  return (
    <main className="page">
      <SiteNav current="about" root />
      <StorySection />
      <Footer />
    </main>
  );
}
