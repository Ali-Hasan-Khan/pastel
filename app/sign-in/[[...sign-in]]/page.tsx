import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { ArrowLeft } from 'lucide-react'

export default function Page() {
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
        <SignIn
          appearance={{
            elements: {
          rootBox: "w-full",
          card: "bg-transparent shadow-none p-0",
          headerTitle: "hidden",
          headerSubtitle: "hidden",
          socialButtonsBlockButton: "bg-[#f0e8f7] dark:bg-[#3a2d4f] hover:bg-[#e2d5f0] dark:hover:bg-[#4a3d5f] border-none text-[#6b5c7c] dark:text-[#d8c5f0] text-sm sm:text-base",
          formButtonPrimary: "bg-[#c4a9db] hover:bg-[#b397d0] dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] rounded-xl text-sm sm:text-base",
          formFieldInput: "rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] bg-white dark:bg-[#251c36] text-[#6b5c7c] dark:text-[#d8c5f0] text-sm sm:text-base",
          formFieldLabel: "text-[#8a7a9b] dark:text-[#a99bc1] text-sm sm:text-base",
          footerActionLink: "text-[#c4a9db] hover:text-[#b397d0] dark:text-[#9f7fc0] dark:hover:text-[#8a6aad] text-sm sm:text-base",
            }
          }}
        />
          </div>
        </div>
      </div>
    </div>
  )
}