"use client"

import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { LoadingSpinnerWithText } from '@/components/ui/loading-spinner'
import { ArrowLeft } from 'lucide-react'
import styles from '@/styles/SignIn.module.css'
import { useUser } from '@clerk/nextjs'

export default function Page() {
  const { isLoaded } = useUser()

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f9f5f2] to-[#f5f0f9] dark:from-[#1f1a2e] dark:to-[#2a1e3f] transition-colors duration-300">
      <header className="fixed w-full bg-white/80 dark:bg-[#1f1a2e]/90 backdrop-blur-md z-50 border-b border-[#e9dff5] dark:border-[#3a2d4f]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="pastel-logo" width={50} height={50} />
            <span className="text-2xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0]">Pastel</span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/">
              <Button variant="ghost" className="flex items-center space-x-2 text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-24 sm:pt-32 pb-16">
        <div className="max-w-md mx-auto w-full">
          <div className="p-1 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4 sm:mb-6 text-center">
              Welcome Back
            </h1>
            
            {!isLoaded ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <LoadingSpinnerWithText 
                  text="Loading sign in..." 
                  size="lg"
                />
              </div>
            ) : (
              <SignIn
                appearance={{
                  elements: {
                    rootBox: styles.rootBox,
                    card: styles.card,
                    headerTitle: styles.headerTitle,
                    headerSubtitle: styles.headerSubtitle,
                    socialButtonsBlockButton: styles.socialButtonsBlockButton,
                    formButtonPrimary: styles.formButtonPrimary,
                    formFieldInput: styles.formFieldInput,
                    formFieldLabel: styles.formFieldLabel,
                    footer: styles.footer,
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}