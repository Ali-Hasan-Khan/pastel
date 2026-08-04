"use client"

import { motion } from "framer-motion"
import { WriteIcon, ScheduleIcon, PerspectiveIcon } from "@/components/icons/brand-icons"

const steps = [
  {
    icon: WriteIcon,
    label: "01",
    title: "Put it into words",
    description: "Capture a moment exactly as it feels—without trying to make it perfect.",
  },
  {
    icon: ScheduleIcon,
    label: "02",
    title: "Pick a future date",
    description: "Choose when you want this memory to find its way back to you.",
  },
  {
    icon: PerspectiveIcon,
    label: "03",
    title: "Receive fresh perspective",
    description: "Reconnect with your words and notice how far you've come.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
          <span className="h-px w-8 bg-primary/40" />
          A simple ritual
          <span className="h-px w-8 bg-primary/40" />
        </span>
        <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Write now.{" "}
          <span className="font-display italic font-normal text-gradient">Revisit</span> later.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Pastel makes room for reflection without asking you to keep up with another habit.
        </p>
      </motion.div>

      <div className="relative mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
        <div
          className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
          aria-hidden="true"
        />
        {steps.map(({ icon: Icon, ...step }, index) => (
          <motion.article
            key={step.label}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 card-hover"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <span
              className="pointer-events-none absolute -right-2 -top-5 select-none text-7xl font-bold leading-none text-primary/10 transition-colors duration-300 group-hover:text-primary/20"
              aria-hidden="true"
            >
              {step.label}
            </span>
            <div className="relative flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-105">
                <Icon className="h-7 w-7" />
              </div>
              <span className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs font-medium text-muted-foreground">
                Step {step.label}
              </span>
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
              {step.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{step.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
