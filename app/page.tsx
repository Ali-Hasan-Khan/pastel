"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import MemoryPreview from "@/components/memory-preview"
import HowItWorks from "@/components/how-it-works"
import Features from "@/components/features"
import Testimonials from "@/components/testimonials"
import Navbar from "@/components/navbar"
import Pricing from "@/components/pricing"
import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import SplitText from "@/components/ui/animations/splittext"
import { Footer } from "@/components/ui/footer"
import { FAQ } from "@/components/faq"

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#f9f5f2] to-[#f5f0f9] dark:from-[#1f1a2e] dark:to-[#2a1e3f] transition-colors duration-300 relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <SplitText
              text="A gentle space to preserve your past, for the future."
              className="mt-6 sm:mt-0 text-4xl md:text-5xl lg:text-6xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-0 leading-tight"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="lines"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
            <SplitText
              text="Capture the now. Open it later."
              className="text-xl md:text-2xl text-[#8a7a9b] dark:text-[#a99bc1] mt-6 mb-10 homemade-apple-regular"
              delay={100}
              duration={0.6}
              splitType="lines"
            />
          </div>
          {/* Fixed height container for buttons and image */}
          <div className="h-[675px] md:h-[1100px] flex flex-col justify-between items-center">
            {/* Button container with fixed height */}
            <div className="h-16 flex flex-col sm:flex-row justify-center gap-4 mb-0">
              <SignedIn>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="group relative bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] rounded-xl px-8 py-6 text-lg shadow-md transition-all duration-500 hover:shadow-xl hover:shadow-[#c4a9db]/25 hover:-translate-y-0.5 w-full sm:w-auto overflow-hidden"
                  >
                    {/* Subtle shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                    {/* Gentle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f0e8f7]/20 to-[#e9f5f0]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                      Go to Dashboard
                    </span>
                    <ChevronRight className="ml-2 h-5 w-5 relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] rounded-xl px-8 py-6 text-lg shadow-md transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
                  >
                    Get Started
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#c4a9db] text-[#6b5c7c] hover:bg-[#f0e8f7] dark:border-[#9f7fc0] dark:text-[#d8c5f0] dark:hover:bg-[#3a2d4f] rounded-xl px-8 py-6 text-lg"
                >
                  Learn More
                </Button>
              </SignedOut>
            </div>

            {/* Image container */}
            <div className="relative mx-auto max-w-2xl w-full">
              <div className="absolute inset-0 bg-[#e2d5f0] dark:bg-[#3a2d4f] rounded-3xl transform rotate-1 translate-x-1 translate-y-1"></div>
              <div className="relative bg-white dark:bg-[#2a1e3f] rounded-3xl shadow-lg overflow-hidden border border-[#e9dff5] dark:border-[#3a2d4f] p-4">
                <Image
                  src="/placeholder.png"
                  alt="Pastel app interface mockup"
                  width={800}
                  height={500}
                  priority={true}
                  className="w-full rounded-2xl"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Features Section */}
      <Features />

      {/* Preview Component */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-12 text-center">
            Create Your First Memory
          </h2>
          <MemoryPreview />
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing Section */}
      <Pricing />

      {/* FAQ Section */}
      <FAQ />

      {/* Call to Action Footer */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto bg-[#f0e8f7] dark:bg-[#2a1e3f] rounded-3xl p-8 md:p-12 shadow-md">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-6">
            Begin your first time capsule today.
          </h2>
          <p className="text-lg text-[#8a7a9b] dark:text-[#a99bc1] mb-8">
            Start preserving your memories and emotions for your future self to rediscover.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="group relative bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] rounded-xl px-8 py-6 text-lg shadow-md transition-all duration-500 hover:shadow-xl hover:shadow-[#c4a9db]/25 hover:-translate-y-0.5 w-full sm:w-auto overflow-hidden"
                >
                  {/* Subtle shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                  {/* Gentle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f0e8f7]/20 to-[#e9f5f0]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                    Go to Dashboard
                  </span>
                  <ChevronRight className="ml-2 h-5 w-5 relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                </Button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] rounded-xl px-8 py-6 text-lg shadow-md transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#c4a9db] text-[#6b5c7c] hover:bg-[#f0e8f7] dark:border-[#9f7fc0] dark:text-[#d8c5f0] dark:hover:bg-[#3a2d4f] rounded-xl px-8 py-6 text-lg"
                >
                  Explore Features
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  )
}

