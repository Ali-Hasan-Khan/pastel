"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"


export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9 rounded-lg opacity-0">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }


  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 rounded-lg text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#c4b5d8] dark:hover:text-white dark:hover:bg-[#3a2d4f]"
    >
      {theme === "dark" ? <Sun className="h-4 w-4 transition-all" /> : <Moon className="h-4 w-4 transition-all" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
