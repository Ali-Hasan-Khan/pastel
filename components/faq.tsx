"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is Pastel?",
    answer: "Pastel is a journaling platform that lets you write memories and schedule them to be delivered to your future self, with thoughtful AI reflections when they arrive."
  },
  {
    question: "How does the future delivery work?",
    answer: "You write a memory and choose a future date for delivery. When that date arrives, we'll send your memory back to you, along with AI-generated insights about your emotional journey."
  },
  {
    question: "Is my data private?",
    answer: "Yes. Your memories are private and securely stored. Only you can access them, and we never share your data."
  },
  {
    question: "Can I edit or delete a memory after writing it?",
    answer: "You can edit or delete your memories before their scheduled delivery date. After delivery, they become part of your personal archive."
  },
  {
    question: "Is Pastel free to use?",
    answer: "Pastel offers a free tier with core features. We may introduce premium features in the future."
  }
]

export const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
          <span className="h-px w-8 bg-primary/40" />
          Got questions?
          <span className="h-px w-8 bg-primary/40" />
        </span>
        <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Frequently asked{" "}
          <span className="font-display italic font-normal text-gradient">questions</span>.
        </h2>
      </motion.div>

      <motion.div
        className="mx-auto mt-12 max-w-2xl space-y-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            <button
              className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent/50"
              onClick={() => handleToggle(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-panel-${idx}`}
            >
              <span className="pr-4">{faq.question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id={`faq-panel-${idx}`}
              className={`transition-all duration-300 ease-in-out ${
                openIndex === idx
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
              aria-hidden={openIndex !== idx}
            >
              <div className="border-t border-border px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
