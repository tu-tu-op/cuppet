import type { Metadata } from "next";
import Footer from "../Footer";
import SiteNav from "../SiteNav";
import BlogIndex from "./BlogIndex";

const title = "Scheduled AI Agents and Everyday Automation | Cuppet Blog";
const description =
  "Practical guides from the Cuppet team on scheduled AI agents, connected apps, productivity, reminders, and everyday automation.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "scheduled AI agents",
    "AI automation",
    "connected apps",
    "productivity workflows",
    "everyday automation",
    "AI routines",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Cuppet",
  },
};

export default function BlogPage() {
  return (
    <main className="page">
      <SiteNav current="blog" />
      <BlogIndex />
      <Footer />
    </main>
  );
}
