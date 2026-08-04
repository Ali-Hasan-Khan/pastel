"use client"

import { motion } from "framer-motion"

const featured = {
  quote: "I cried reading what I wrote to myself a year ago. Thank you, Pastel.",
  author: "Sarah K.",
  role: "Designer · 24 letters sent",
}

const testimonials = [
  {
    quote:
      "The AI reflections helped me see patterns in my emotional journey I never noticed before.",
    author: "Michael T.",
    role: "Teacher",
  },
  {
    quote:
      "Such a beautiful way to document my life's journey and reflect on my growth.",
    author: "Jamie L.",
    role: "Writer",
  },
  {
    quote:
      "Opening a letter from two years ago was the most grounding five minutes of my year.",
    author: "Priya N.",
    role: "Product Manager",
  },
]

const avatarColors = [
  "bg-primary/15 text-primary",
  "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  "bg-sky-500/15 text-sky-600 dark:text-sky-400",
]

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
          <span className="h-px w-8 bg-primary/40" />
          Loved by memory keepers
          <span className="h-px w-8 bg-primary/40" />
        </span>
        <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          The words find you{" "}
          <span className="font-display italic font-normal text-gradient">when you need them</span>.
        </h2>
      </motion.div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-6">
        <motion.figure
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-8 sm:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="pointer-events-none absolute -top-8 right-6 select-none font-display text-[10rem] italic leading-none text-primary/10"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <blockquote className="relative">
            <p className="max-w-3xl font-display text-2xl italic leading-snug text-foreground sm:text-3xl">
              {featured.quote}
            </p>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${avatarColors[0]}`}>
                {initials(featured.author)}
              </span>
              <div>
                <p className="font-semibold text-foreground">{featured.author}</p>
                <p className="text-sm text-muted-foreground">{featured.role}</p>
              </div>
            </figcaption>
          </blockquote>
        </motion.figure>

        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={index}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <blockquote className="flex-1">
                <p className="leading-relaxed text-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${avatarColors[index + 1]}`}>
                  {initials(testimonial.author)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
