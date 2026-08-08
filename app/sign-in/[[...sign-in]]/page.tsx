"use client"

import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from '@/components/theme-toggle'
import { LoadingSpinnerWithText } from '@/components/ui/loading-spinner'
import { ArrowLeft } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import styles from '@/styles/SignIn.module.css'
import { useUser } from '@clerk/nextjs'

export default function Page() {
  const { isLoaded } = useUser()
  const reduceMotion = useReducedMotion()

  return (
    <div className="section-tint-soft min-h-screen transition-colors duration-300">
      <header className="fixed w-full bg-background/80 backdrop-blur-xl z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="pastel-logo" width={40} height={40} />
            <span className="text-2xl font-bold text-foreground">Pastel</span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/">
              <span className="text-link text-sm font-medium">
                <ArrowLeft className="h-4 w-4" />
                Back
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-24 sm:pt-32 pb-16">
        <div className="max-w-md mx-auto w-full">
          <div className="p-1 sm:p-8">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="eyebrow block text-center">Welcome back</span>
              <h1 className="mt-4 text-center font-display text-4xl italic text-foreground sm:text-5xl">
                Continue your story
              </h1>
              <p className="mt-3 text-center text-muted-foreground">
                Sign in to write, schedule, and revisit the moments that matter.
              </p>
            </motion.div>

            {!isLoaded ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <LoadingSpinnerWithText
                  text="Loading sign in..."
                  size="lg"
                />
              </div>
            ) : (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
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
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
