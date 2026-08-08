"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { WriteIcon, ScheduleIcon, PerspectiveIcon } from "@/components/icons/brand-icons"

const steps = [
  {
    icon: WriteIcon,
    label: "01",
    title: "Put it into words",
    description: "Capture a moment exactly as it feels—without trying to make it perfect.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80",
    alt: "Writing a memory in a journal",
  },
  {
    icon: ScheduleIcon,
    label: "02",
    title: "Pick a future date",
    description: "Choose when you want this memory to find its way back to you.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=80",
    alt: "A calendar and notebook planning a future date",
  },
  {
    icon: PerspectiveIcon,
    label: "03",
    title: "Receive fresh perspective",
    description: "Reconnect with your words and notice how far you've come.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
    alt: "A peaceful landscape viewed from above",
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
        <span className="eyebrow">A simple ritual</span>
        <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Write now.{" "}
          <span className="font-display italic font-normal text-gradient">Revisit</span> later.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Pastel makes room for reflection without asking you to keep up with another habit.
        </p>
      </motion.div>

      <div className="relative mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
        {steps.map(({ icon: Icon, ...step }, index) => (
          <motion.article
            key={step.label}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card card-hover"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={step.image}
                alt={step.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              <span className="absolute right-4 top-4 rounded-full bg-black/45 px-3 py-1 font-mono text-xs font-medium text-white backdrop-blur-sm ring-1 ring-white/25">
                Step {step.label}
              </span>
            </div>
            <div className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-105">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
