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
              className="mt-6 sm:mt-0 text-4xl md:text-5xl lg:text-6xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-6 leading-tight"
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
              className="text-xl md:text-2xl text-[#8a7a9b] dark:text-[#a99bc1] mb-10"
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
              <Button
                variant="outline"
                size="lg"
                className="border-[#c4a9db] text-[#6b5c7c] hover:bg-[#f0e8f7] dark:border-[#9f7fc0] dark:text-[#d8c5f0] dark:hover:bg-[#3a2d4f] rounded-xl px-8 py-6 text-lg"
              >
                Explore Features
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#e2d5f0] dark:bg-[#1f1a2e] py-12 border-t border-[#e9dff5] dark:border-[#3a2d4f]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center mb-4">
                <Image src="/logo.png" alt="pastel-logo" width={40} height={40} />
                <span className="text-xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] ml-2">Pastel</span>
              </Link>
              <p className="text-[#8a7a9b] dark:text-[#a99bc1] mb-4">
                Preserve your thoughts and memories with our unique digital time capsule system
              </p>
              {/* Social Links */}
              <div className="flex space-x-4">
                <Link href="https://twitter.com/pastel" className="text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="https://github.com/Ali-Hasan-Khan/pastel" className="text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="https://linkedin.com/company/pastel" className="text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 128 128">
                    <path fill="#e2d5f0" className="dark:fill-[#1f1a2e]" d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z" />
                    <path fill="currentColor" d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="mailto:support@pastel.com" className="text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#terms" className="text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#privacy" className="text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#e9dff5] dark:border-[#3a2d4f] mt-8 pt-8 text-center text-[#8a7a9b] dark:text-[#a99bc1]">
            <p>© {new Date().getFullYear()} Pastel. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
