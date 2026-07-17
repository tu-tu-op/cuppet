import type { Metadata } from "next";
import SiteNav from "../SiteNav";

export const metadata: Metadata = {
  title: "Blog — Cuppet",
  description: "The Cuppet blog.",
};

export default function BlogPage() {
  return (
    <main className="page">
      <SiteNav current="blog" />
    </main>
  );
}
