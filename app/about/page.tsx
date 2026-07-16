import type { Metadata } from "next";
import Footer from "../Footer";
import SiteNav from "../SiteNav";
import StorySection from "../StorySection";

export const metadata: Metadata = {
  title: "About Us — Cuppet",
  description: "Why we are building Cuppet and how the product is taking shape in public.",
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
