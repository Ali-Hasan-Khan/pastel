import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import MemoryPreview from "@/components/memory-preview"
import HowItWorks from "@/components/how-it-works"
import Features from "@/components/features"
import Testimonials from "@/components/testimonials"
import Navbar from "@/components/navbar"
import Pricing from "@/components/pricing"
import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#f9f5f2] to-[#f5f0f9] dark:from-[#1f1a2e] dark:to-[#2a1e3f] transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-6 leading-tight">
            A gentle space to preserve your past, for the future.
          </h1>
          <p className="text-xl md:text-2xl text-[#8a7a9b] dark:text-[#a99bc1] mb-10">
            Capture the now. Open it later.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] rounded-xl px-8 py-6 text-lg shadow-md transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
                >
                  Go to Dashboard
                  <ChevronRight className="ml-2 h-5 w-5" />
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

          <div className="relative mx-auto max-w-2xl">
            <div className="absolute inset-0 bg-[#e2d5f0] dark:bg-[#3a2d4f] rounded-3xl transform rotate-1 translate-x-1 translate-y-1"></div>
            <div className="relative bg-white dark:bg-[#2a1e3f] rounded-3xl shadow-lg overflow-hidden border border-[#e9dff5] dark:border-[#3a2d4f] p-4">
              <img
                src="/placeholder.png?height=500&width=800"
                alt="Pastel app interface mockup"
                className="w-full rounded-2xl"
              />
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
                  className="bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] rounded-xl px-8 py-6 text-lg shadow-md transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
                >
                  Go to Dashboard
                  <ChevronRight className="ml-2 h-5 w-5" />
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
      <footer className="bg-[#f5f0f9] dark:bg-[#1f1a2e] py-8 border-t border-[#e9dff5] dark:border-[#3a2d4f]">
        <div className="container mx-auto px-4 text-center text-[#8a7a9b] dark:text-[#a99bc1]">
          <p>© {new Date().getFullYear()} Pastel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
