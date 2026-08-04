"use client"

import { motion } from "framer-motion"
import {
  DeliveryIcon,
  ReflectionsIcon,
  ContextIcon,
  LockHeartIcon,
} from "@/components/icons/brand-icons"

const features = [
  {
    icon: DeliveryIcon,
    title: "Thoughtful delivery",
    description: "Schedule a memory for a meaningful date, or simply let surprise do its work.",
  },
  {
    icon: ReflectionsIcon,
    title: "Gentle reflections",
    description: "See patterns in your writing with prompts designed for insight, not judgment.",
  },
  {
    icon: ContextIcon,
    title: "A life in context",
    description: "Notice emotional rhythms and personal milestones as your archive grows.",
  },
  {
    icon: LockHeartIcon,
    title: "Yours, always",
    description: "Your memories remain private—a personal archive built around trust.",
  },
]

export default function Features() {
  return (
    <section id="features" className="scroll-mt-24 border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
              <span className="h-px w-8 bg-primary/40" />
              Built for the long view
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              A journal that{" "}
              <span className="font-display italic font-normal text-gradient">
                gives something back
              </span>
              .
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              More than a place to save thoughts—it is a way to meet them again with the
              perspective you didn&apos;t have before.
            </p>
            <div className="mt-8 flex items-center gap-6 border-t border-border pt-6">
              <div>
                <p className="text-2xl font-bold text-foreground">93%</p>
                <p className="text-xs text-muted-foreground">feel more grateful after a year of letters</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">10k+</p>
                <p className="text-xs text-muted-foreground">memories delivered to future selves</p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {features.map(({ icon: Icon, title, description }, index) => (
              <motion.article
                key={title}
                className={`group rounded-2xl border border-border bg-card p-6 card-hover ${
                  index === 0 ? "sm:col-span-2" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div
                  className={`flex items-center gap-4 ${
                    index === 0 ? "sm:items-center" : "sm:block"
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className={index === 0 ? "sm:mt-0" : "sm:mt-4"}>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
