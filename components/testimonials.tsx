"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      quote: "I cried reading what I wrote to myself a year ago. Thank you, Pastel.",
      author: "Sarah K.",
      role: "Designer",
    },
    {
      quote: "The AI reflections helped me see patterns in my emotional journey I never noticed before.",
      author: "Michael T.",
      role: "Teacher",
    },
    {
      quote: "Such a beautiful way to document my life's journey and reflect on my growth.",
      author: "Jamie L.",
      role: "Writer",
    },
  ]

  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-accent/50 px-4 py-1.5 text-sm font-medium text-muted-foreground">
          Loved by memory keepers
        </span>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          What People Are Saying
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Join thousands who are preserving their memories with Pastel.
        </p>
      </motion.div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="flex flex-col rounded-2xl border border-border bg-card p-6 card-hover"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Quote className="h-8 w-8 text-primary/40 mb-4" />
            <p className="flex-1 text-foreground leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="mt-6 pt-4 border-t border-border">
              <p className="font-semibold text-foreground">{testimonial.author}</p>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
