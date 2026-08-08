"use client"

import { ArrowRight, ArrowUpRight, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import HowItWorks from "@/components/how-it-works"
import Features from "@/components/features"
import MemoryPreview from "@/components/memory-preview"
import Testimonials from "@/components/testimonials"
import Pricing from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/ui/footer"
import {
  DeliveryIcon,
  ScheduleIcon,
  WriteIcon,
  PerspectiveIcon,
} from "@/components/icons/brand-icons"
import { motion, useReducedMotion } from "framer-motion"

function Letters({
  text,
  className = "",
  letterClassName = "",
  delay = 0,
}: {
  text: string
  className?: string
  letterClassName?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <span className={`${className} ${letterClassName}`}>{text}</span>
  }

  return (
    <span className={`${className} inline-block`} aria-label={text} role="text">
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden="true"
          className={`inline-block will-change-transform ${letterClassName}`}
          initial={{ opacity: 0, y: "0.6em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.022,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}

const quickActions = [
  {
    icon: WriteIcon,
    title: "Write a letter",
    description: "Capture a moment exactly as it feels.",
    href: "/dashboard",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
    alt: "Writing a letter in a notebook",
  },
  {
    icon: ScheduleIcon,
    title: "Choose a date",
    description: "Decide when it finds its way back.",
    href: "/dashboard/compose",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80",
    alt: "Planning a date in a calendar with a pen",
  },
  {
    icon: PerspectiveIcon,
    title: "Gain perspective",
    description: "Revisit with the wisdom of distance.",
    href: "/dashboard",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    alt: "A serene landscape to reflect on",
  },
  {
    icon: DeliveryIcon,
    title: "Remember what matters",
    description: "Let a little time make it clearer.",
    href: "/dashboard/archive",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    alt: "A peaceful beach at sunset",
  },
]

const marqueeItems = [
  "Letters to your future self",
  "Gentle reflections",
  "Private by design",
  "Emotional timelines",
  "Memories that find you",
  "Write now, revisit later",
]

function MarqueeTicker() {
  const row = [...marqueeItems, ...marqueeItems]
  return (
    <section className="relative overflow-hidden border-y border-border bg-muted/40 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-8">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="text-sm font-medium text-muted-foreground">{item}</span>
            <svg viewBox="0 0 48 48" className="h-3 w-3 text-primary" fill="currentColor" stroke="none" aria-hidden="true">
              <path d="M24 4l5.2 10.4 11.6 1.7-8.4 8.2 2 11.6L24 30.8l-10.4 5.5 2-11.6-8.4-8.2 11.6-1.7z" />
            </svg>
          </span>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[60] opacity-[0.025]" aria-hidden="true" />
      <Navbar />

      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="section-tint-soft absolute inset-0 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              <Letters text="Make today " delay={0.05} />
              <span className="font-display italic font-normal">
                <Letters
                  text="worth revisiting"
                  delay={0.35}
                  letterClassName="text-gradient"
                />
              </span>
              <Letters text="." delay={0.85} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl"
            >
              Pastel helps you capture the moments that matter, then returns them when they can
              mean something new.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <SignedIn>
                <Button asChild size="lg" className="btn-sweep btn-arrow h-12 rounded-full px-6 text-base shadow-sm">
                  <Link href="/dashboard">Open your space <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </SignedIn>
              <SignedOut>
                <Button asChild size="lg" className="btn-sweep btn-arrow h-12 rounded-full px-6 text-base shadow-sm">
                  <Link href="/dashboard">Start writing for free <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Link href="#how-it-works" className="text-link pl-2 text-base font-medium">
                  See how it works
                </Link>
              </SignedOut>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" /> Private by default
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" /> No credit card
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" /> Free to start
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-20 max-w-6xl"
          >
            <div className="absolute -inset-x-8 top-1/2 h-40 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />

            <div className="relative rounded-3xl bg-gradient-to-b from-border to-transparent p-px shadow-2xl">
              <div className="rounded-3xl bg-background p-2">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <span className="ml-3 font-mono text-xs text-muted-foreground">
                    pastel.app / your memories
                  </span>
                </div>
                <Image
                  src="/placeholder-light.png"
                  alt="Pastel workspace showing a personal memory timeline"
                  width={1200}
                  height={750}
                  priority
                  className="w-full rounded-b-3xl dark:hidden"
                />
                <Image
                  src="/placeholder-dark.png"
                  alt="Pastel workspace showing a personal memory timeline"
                  width={1200}
                  height={750}
                  priority
                  className="hidden w-full rounded-b-3xl dark:block"
                />
              </div>
            </div>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map(({ icon: Icon, title, description, href, image, alt }, index) => (
              <motion.a
                key={title}
                href={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card card-hover"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/90 text-primary-foreground ring-1 ring-white/20 shadow-sm">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex flex-1 items-start gap-3 p-4 pt-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <MarqueeTicker />

      <HowItWorks />
      <Features />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">Your first letter</span>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Leave something meaningful for{" "}
            <span className="font-display italic font-normal text-gradient">future you</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Write it now, choose when it returns, and let a little distance make it clearer.
          </p>
        </motion.div>
        <div className="mx-auto mt-12 max-w-5xl">
          <MemoryPreview />
        </div>
      </section>

      <Testimonials />
      <Pricing />
      <FAQ />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl section-tint px-6 py-16 text-center shadow-xl sm:py-24">
          <div className="absolute inset-0 bg-grid opacity-[0.05]" />
          <div className="noise-overlay absolute inset-0 opacity-[0.04]" aria-hidden="true" />
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />

          <div className="relative">
            <span className="eyebrow">Your story is already happening</span>
            <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Give it a{" "}
              <span className="font-display italic font-normal">place to live</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              Start with one thought. Future you will be glad you did.
            </p>
            <Button
              asChild
              size="lg"
              className="btn-sweep btn-arrow mt-8 h-12 rounded-full px-6 text-base shadow-sm"
            >
              <Link href="/dashboard">
                Create your first memory <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
