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
    <section id="features" className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <motion.div
            className="text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-accent/50 px-4 py-1.5 text-sm font-medium text-muted-foreground">
              Built for the long view
            </span>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              A journal that gives something back.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              More than a place to save thoughts—it is a way to meet them again with the perspective
              you didn&apos;t have before.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description }, index) => (
              <motion.article
                key={title}
                className="group rounded-2xl border border-border bg-card p-6 card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
