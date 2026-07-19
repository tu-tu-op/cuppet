import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router'
import EditorialVisual from '../components/EditorialVisual'
import Seo from '../components/Seo'
import SiteLayout from '../components/SiteLayout'
import { blogPosts, getBlogPost } from '../data/blog'
import NotFound from './NotFound'

export default function BlogPost() {
  const { slug = '' } = useParams()
  const post = getBlogPost(slug)

  if (!post) return <NotFound />

  const currentIndex = blogPosts.findIndex((item) => item.slug === post.slug)
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length]
  const canonicalPath = `/blog/${post.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published,
    dateModified: post.published,
    author: {
      '@type': 'Organization',
      name: 'Cuppet team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cuppet',
    },
    mainEntityOfPage: `https://cuppet-app.shatslabs.chatgpt.site${canonicalPath}`,
  }

  return (
    <SiteLayout>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={canonicalPath}
        type="article"
        published={post.published}
        jsonLd={jsonLd}
      />
      <main>
        <article>
          <header className="px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
            <div className="mx-auto max-w-4xl">
              <Link
                to="/blog"
                className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/42 transition-colors hover:text-black"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                All articles
              </Link>
              <div className="mt-10 flex flex-wrap items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-black/35">
                <span>{post.category}</span>
                <span className="h-px w-6 bg-black/15" />
                <time dateTime={post.published}>{post.displayDate}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h1 className="mt-7 max-w-4xl font-display text-[3.7rem] font-normal leading-[0.93] tracking-[-0.04em] text-[#171a17] sm:text-[5.7rem]">
                {post.title}
              </h1>
              <p className="mt-8 max-w-2xl text-[18px] leading-8 text-black/55 sm:text-[20px]">
                {post.dek}
              </p>
              <div className="mt-9 flex items-center gap-3 border-t border-black/10 pt-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173c2a] text-[10px] font-bold text-[#F5F3EE]">
                  C
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-[#171a17]">Cuppet team</p>
                  <p className="mt-0.5 text-[10px] text-black/35">Product and research</p>
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <EditorialVisual variant={post.visual} />
          </div>

          <div className="mx-auto max-w-[760px] px-5 py-20 sm:px-8 sm:py-28">
            {post.sections.map((section, index) => (
              <section
                key={section.heading}
                className={index === 0 ? '' : 'mt-16 border-t border-black/10 pt-14'}
              >
                <div className="flex items-start gap-5">
                  <span className="mt-2 font-mono text-[9px] text-black/25">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-display text-[2.35rem] font-normal leading-none tracking-[-0.025em] text-[#171a17] sm:text-[3rem]">
                    {section.heading}
                  </h2>
                </div>
                <div className="mt-8 space-y-6 sm:pl-9">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[16px] leading-8 text-black/62">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>

        <aside className="border-y border-black/10 bg-[#e7e8e1] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <EditorialVisual variant={nextPost.visual} compact />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
                Read next
              </p>
              <h2 className="mt-6 max-w-xl font-display text-[2.8rem] font-normal leading-[0.98] tracking-[-0.03em] text-[#171a17] sm:text-[3.7rem]">
                {nextPost.title}
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-6 text-black/50">{nextPost.excerpt}</p>
              <Link
                to={`/blog/${nextPost.slug}`}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#173c2a]"
              >
                Continue reading
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </aside>
      </main>
    </SiteLayout>
  )
}
