import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import EditorialVisual from '../components/EditorialVisual'
import Seo from '../components/Seo'
import SiteLayout from '../components/SiteLayout'
import { blogPosts } from '../data/blog'
import CTA from '../sections/CTA'

export default function Blog() {
  return (
    <SiteLayout>
      <Seo
        title="Blog"
        description="Ideas from Cuppet about selected intelligence, connected tools, trustworthy AI, and designing for attention."
        path="/blog"
      />
      <main>
        <section className="relative border-b border-black/10 px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-44">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-6xl"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-black/25" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
                Cuppet journal
              </span>
            </div>
            <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <h1 className="max-w-3xl font-display text-[4rem] font-normal leading-[0.91] tracking-[-0.04em] text-[#171a17] sm:text-[6.4rem]">
                Ideas for quieter, <span className="italic text-[#2c6042]">more useful AI.</span>
              </h1>
              <p className="max-w-md pb-2 text-[15px] leading-7 text-black/52 lg:ml-auto">
                Notes on attention, connected work, product judgment, and building AI that knows
                when not to interrupt.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            {blogPosts.map((post, index) => {
              const visualOnRight = index % 2 === 1
              return (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid items-stretch gap-9 border-t border-black/10 py-14 first:pt-0 md:grid-cols-2 md:gap-12 lg:gap-20 ${
                    index === blogPosts.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className={visualOnRight ? 'md:order-2' : ''}
                    aria-label={`Read ${post.title}`}
                  >
                    <EditorialVisual variant={post.visual} />
                  </Link>
                  <div
                    className={`flex flex-col justify-center ${
                      visualOnRight ? 'md:order-1' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-black/35">
                      <span>{post.category}</span>
                      <span className="h-px w-5 bg-black/15" />
                      <time dateTime={post.published}>{post.displayDate}</time>
                      <span>·</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h2 className="mt-6 max-w-lg font-display text-[2.7rem] font-normal leading-[0.98] tracking-[-0.03em] text-[#171a17] sm:text-[3.4rem]">
                      <Link to={`/blog/${post.slug}`} className="transition-colors hover:text-[#2c6042]">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-6 max-w-lg text-[15px] leading-7 text-black/52">{post.excerpt}</p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#173c2a]"
                    >
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </section>

        <CTA />
      </main>
    </SiteLayout>
  )
}
