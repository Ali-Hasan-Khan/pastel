import Link from "next/link"
import Image from "next/image"
import { NavbarActions } from "./navbar-actions"

export default function Navbar() {
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

        <div className="w-[180px] flex justify-end">
          <NavbarActions />
        </div>

      </div>
    </header>
  )
}
