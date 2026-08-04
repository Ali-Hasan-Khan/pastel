"use client"

import { ArrowRight, Check, Play } from "lucide-react"
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
import { DeliveryIcon, ScheduleIcon } from "@/components/icons/brand-icons"
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: {
    transition: { staggerChildren: 0.12 },
  },
}

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

      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 bg-gradient-radial-accent pointer-events-none" />
        <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-orb" />
        <div className="absolute -right-32 top-1/2 h-[28rem] w-[28rem] rounded-full bg-secondary blur-3xl animate-orb-reverse" />

        <motion.div
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              A private place for your life in progress
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mt-8 text-balance text-5xl font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl"
            >
              Make today{" "}
              <span className="font-display italic font-normal text-gradient">worth revisiting</span>
              <span className="text-foreground">.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl"
            >
              Pastel helps you capture the moments that matter, then returns them when they can
              mean something new.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <SignedIn>
                <Button asChild size="lg" className="h-12 px-6 text-base rounded-full shadow-sm">
                  <Link href="/dashboard">Open your space <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </SignedIn>
              <SignedOut>
                <Button asChild size="lg" className="h-12 px-6 text-base rounded-full shadow-sm">
                  <Link href="/dashboard">Start writing for free <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-5 text-base rounded-full">
                  <Link href="#how-it-works"><Play className="h-4 w-4" /> See how it works</Link>
                </Button>
              </SignedOut>
            </motion.div>

            <motion.div
              variants={fadeInUp}
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

          <motion.div variants={fadeInUp} className="relative mx-auto mt-20 max-w-6xl">
            <div className="absolute -inset-x-8 top-1/2 h-40 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />

            <div className="hidden lg:block absolute -left-10 top-16 z-10 animate-float">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <DeliveryIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Your memory arrived</p>
                  <p className="text-[11px] text-muted-foreground">From exactly one year ago</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block absolute -right-10 bottom-14 z-10 animate-float [animation-delay:1.5s]">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-xl">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="text-[11px] font-medium text-muted-foreground">Emotional balance</p>
                    <p className="mt-1 text-lg font-bold text-foreground">Calm &amp; growing</p>
                  </div>
                  <div className="flex h-10 items-end gap-1">
                    <div className="w-1.5 rounded-full bg-primary/30" style={{ height: "35%" }} />
                    <div className="w-1.5 rounded-full bg-primary/40" style={{ height: "55%" }} />
                    <div className="w-1.5 rounded-full bg-primary/60" style={{ height: "45%" }} />
                    <div className="w-1.5 rounded-full bg-primary/80" style={{ height: "75%" }} />
                    <div className="w-1.5 rounded-full bg-primary" style={{ height: "90%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex absolute -top-6 right-16 z-10 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-lg animate-float [animation-delay:3s]">
              <ScheduleIcon className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">12 letters saved</span>
            </div>

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
        </motion.div>
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
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary/40" />
            Your first letter
            <span className="h-px w-8 bg-primary/40" />
          </span>
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

      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-[hsl(var(--primary))] to-foreground px-6 py-16 text-center shadow-xl sm:py-24">
          <div className="absolute inset-0 bg-grid opacity-[0.05]" />
          <div className="noise-overlay absolute inset-0 opacity-[0.04]" aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-1/3 animate-sheen bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-foreground/20 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
              Your story is already happening
            </span>
            <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Give it a{" "}
              <span className="font-display italic font-normal">place to live</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/75">
              Start with one thought. Future you will be glad you did.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 bg-white px-6 text-base text-zinc-900 hover:bg-white/90 rounded-full shadow-sm"
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
