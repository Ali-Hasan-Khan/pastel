"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const featured = {
  quote: "I cried reading what I wrote to myself a year ago. Thank you, Pastel.",
  author: "Sarah K.",
  role: "Designer · 24 letters sent",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
}

const testimonials = [
  {
    quote:
      "The AI reflections helped me see patterns in my emotional journey I never noticed before.",
    author: "Michael T.",
    role: "Teacher",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    quote:
      "Such a beautiful way to document my life's journey and reflect on my growth.",
    author: "Jamie L.",
    role: "Writer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    quote:
      "Opening a letter from two years ago was the most grounding five minutes of my year.",
    author: "Priya N.",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
  },
]

function Avatar({ src, name, className = "" }: { src: string; name: string; className?: string }) {
  return (
    <span className={`relative overflow-hidden rounded-full ring-2 ring-border ${className}`}>
      <Image
        src={src}
        alt={name}
        fill
        sizes="64px"
        className="object-cover"
      />
    </span>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-tint mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="eyebrow">Loved by memory keepers</span>
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
              <Avatar src={featured.avatar} name={featured.author} className="h-11 w-11" />
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
                <Avatar src={testimonial.avatar} name={testimonial.author} className="h-9 w-9" />
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
