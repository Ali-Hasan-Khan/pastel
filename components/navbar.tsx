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
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
];

const menuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
};

const linkVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.08 + i * 0.07,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Navbar() {
  const { isLoaded, isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled || mobileOpen
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              className="p-2 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <div
              className="absolute inset-0 bg-background/60 backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <nav className="relative flex h-full flex-col px-6 pt-28 pb-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={reduceMotion ? undefined : linkVariants}
                  initial={reduceMotion ? false : "hidden"}
                  animate={reduceMotion ? false : "visible"}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-baseline gap-4 py-3"
                  >
                    <span className="eyebrow">0{i + 1}</span>
                    <span className="font-display text-3xl italic text-foreground transition-colors group-hover:text-primary">
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                custom={navLinks.length}
                variants={reduceMotion ? undefined : linkVariants}
                initial={reduceMotion ? false : "hidden"}
                animate={reduceMotion ? false : "visible"}
                className="mt-8 flex flex-col gap-3 border-t border-border pt-8"
              >
                {!isLoaded ? null : isSignedIn ? (
                  <SignedIn>
                    <Button asChild size="lg" className="btn-sweep rounded-full">
                      <Link href="/dashboard">Open your space</Link>
                    </Button>
                    <div className="flex justify-center">
                      <UserButton />
                    </div>
                  </SignedIn>
                ) : (
                  <SignedOut>
                    <SignUpButton>
                      <Button size="lg" className="btn-sweep w-full rounded-full">
                        Sign Up Free
                      </Button>
                    </SignUpButton>
                    <SignInButton>
                      <Button variant="ghost" size="lg" className="w-full rounded-full">
                        Log In
                      </Button>
                    </SignInButton>
                  </SignedOut>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
