"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
];

export default function Navbar() {
  const { isLoaded, isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt="pastel-logo"
            width={32}
            height={32}
            className="transition-all duration-300"
          />
          <span className="text-xl font-bold text-foreground">Pastel</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <ThemeToggle />
          {!isLoaded ? (
            <div
              className="hidden sm:flex items-center gap-2 sm:w-[148px] justify-end"
              aria-hidden="true"
            />
          ) : isSignedIn ? (
            <div className="flex items-center sm:w-[148px] justify-end">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2 sm:w-[148px] justify-end">
              <SignedOut>
                <SignInButton>
                  <Button variant="ghost" size="sm" className="text-sm">
                    Log In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button size="sm" className="text-sm rounded-lg">
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
            </div>
          )}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl">
          <nav className="flex flex-col px-4 py-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 border-t border-border">
              <SignedOut>
                <SignInButton>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Log In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button size="sm" className="flex-1">
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
