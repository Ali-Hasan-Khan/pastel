import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
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
  return (
    <header className="fixed w-full bg-white/80 dark:bg-[#1f1a2e]/90 backdrop-blur-md z-50 border-b border-[#e9dff5] dark:border-[#3a2d4f]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="min-w-[160px]">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="pastel-logo" width={50} height={50}></Image>
            <span className="text-2xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0]">Pastel</span>
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

        <div className="flex justify-end sm:max-w-[180px]">
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
          {isLoaded && isSignedIn && <div className="flex items-center min-w-[30px] sm:min-w-[160px] space-x-1 mr-2 sm:mr-0 sm:space-x-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>}
        </div>

      </div>
    </header>
  )
}
