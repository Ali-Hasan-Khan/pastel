"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import { useState, useEffect } from "react"
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs"

export default function Navbar() {
  const { isLoaded, isSignedIn } = useUser()
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolled(currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out translate-y-0 opacity-100'
        ${isScrolled
          ? 'bg-white/95 dark:bg-[#1f1a2e]/95 backdrop-blur-md shadow-lg border-b border-[#e9dff5] dark:border-[#3a2d4f]'
          : 'bg-transparent'
        }`}
    >
      <div className={`container mx-auto px-2 md:px-4 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-3 mt-4 bg-white/40 dark:bg-accent rounded-2xl backdrop-blur-xl shadow-md'
        }`}>
        <div className="flex items-center justify-between">
          <div className="min-w-[160px]">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="pastel-logo"
                width={isScrolled ? 40 : 50}
                height={isScrolled ? 40 : 50}
                className="transition-all duration-300"
              />
              <span className={`font-bold text-[#6b5c7c] dark:text-[#d8c5f0] transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'
                }`}>
                Pastel
              </span>
            </Link>
          </div>

          <div className="flex-1 flex justify-center">
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] transition-colors"
              >
                Pricing
              </Link>
            </nav>
          </div>

          <div className="flex justify-end sm:max-w-[180px] sm:min-w-[180px]">
            <ThemeToggle />
            {!isSignedIn && <div className="flex items-center sm:min-w-[180px] space-x-1 mr-2 sm:mr-0 sm:space-x-4">
              <SignedOut>
                <SignInButton>
                  <Button
                    variant="ghost"
                    className="text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]">
                    Log In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] rounded-xl">
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
            </div>}
            {isLoaded && isSignedIn && <div className="flex items-center space-x-1 mr-2 sm:mr-0 sm:space-x-4">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>}
          </div>
        </div>
      </div>
    </header>
  )
}
