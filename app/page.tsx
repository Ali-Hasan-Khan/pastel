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
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
}

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />

      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-radial-accent pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />

        <motion.div
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-accent/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary" />
              A private place for your life in progress
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
            >
              Make today{" "}
              <span className="text-gradient">worth revisiting</span>
              <span className="text-foreground">.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl"
            >
              Pastel helps you capture the moments that matter, then returns them when they can mean something new.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <SignedIn>
                <Button asChild size="lg" className="h-12 px-6 text-base rounded-xl">
                  <Link href="/dashboard">Open your space <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </SignedIn>
              <SignedOut>
                <Button asChild size="lg" className="h-12 px-6 text-base rounded-xl shadow-sm">
                  <Link href="/dashboard">Start writing for free <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-5 text-base rounded-xl">
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

          <motion.div
            variants={fadeInUp}
            className="mx-auto mt-16 max-w-6xl"
          >
            <div className="relative rounded-2xl border border-border bg-background p-2 shadow-xl">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="ml-3 text-xs text-muted-foreground">pastel.app / your memories</span>
              </div>
              <Image
                src="/placeholder-light.png"
                alt="Pastel workspace showing a personal memory timeline"
                width={1200}
                height={750}
                priority
                className="w-full rounded-b-lg dark:hidden"
              />
              <Image
                src="/placeholder-dark.png"
                alt="Pastel workspace showing a personal memory timeline"
                width={1200}
                height={750}
                priority
                className="hidden w-full rounded-b-lg dark:block"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="border-y border-border bg-muted/50 py-5">
        <p className="mx-auto max-w-7xl px-4 text-center text-sm font-medium text-muted-foreground sm:px-6 lg:px-8">
          A calmer way to journal, reflect, and remember the life you&apos;re building.
        </p>
      </section>

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
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-accent/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-4">
            Your first letter
          </span>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Leave something meaningful for future you.
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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 to-primary px-6 py-16 text-center shadow-xl sm:py-24">
          <div className="absolute inset-0 bg-grid opacity-[0.04]" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80">
              Your story is already happening
            </span>
            <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Give it a place to live.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/70">
              Start with one thought. Future you will be glad you did.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 bg-white px-6 text-base text-zinc-900 hover:bg-white/90 rounded-xl shadow-sm"
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
