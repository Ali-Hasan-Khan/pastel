'use client'

import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"

function SignedInSkeleton() {
  return (
    <div className="w-8 h-8 rounded-full bg-[#f0e8f7] dark:bg-[#c43b3b] animate-pulse" />
  )
}

function SignedOutSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <div className="h-9 w-20 rounded-lg bg-[#f0e8f7] dark:bg-[#4ec639] animate-pulse" />
      <div className="h-9 w-24 rounded-xl bg-[#c4a9db] dark:bg-[#9f7fc0] animate-pulse" />
    </div>
  )
}

export function NavbarActions() {
  return (
    <div className="flex items-center space-x-1 mr-2 sm:mr-0 sm:space-x-4">
      <Suspense fallback={<div className="w-9 h-9 rounded-lg bg-[#f0e8f7] dark:bg-[#3a2d4f] animate-pulse" />}>
        <ThemeToggle />
      </Suspense>

      <SignedIn>
        <Suspense fallback={<SignedInSkeleton />}>
          <UserButton />
        </Suspense>
      </SignedIn>

      <SignedOut>
        <Suspense fallback={<SignedOutSkeleton />}>
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
        </Suspense>
      </SignedOut>
    </div>
  )
}