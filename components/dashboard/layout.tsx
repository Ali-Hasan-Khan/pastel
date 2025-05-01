"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import { 
  PenLine, 
  Clock, 
  Archive, 
  Settings, 
  LineChart,
  Upload,
  Share2,
  Menu,
  X,
  HomeIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon }, 
  { name: "Compose", href: "/dashboard/compose", icon: PenLine },
  { name: "Upcoming", href: "/dashboard/upcoming", icon: Clock },
  { name: "History", href: "/dashboard/capsules/history", icon: Archive },
  { name: "Analytics", href: "/dashboard/analytics", icon: LineChart },
  { name: "Import", href: "/dashboard/import", icon: Upload },
  { name: "Share", href: "/dashboard/share", icon: Share2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#f9f5f2] dark:bg-[#1f1a2e]">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        
        {sidebarOpen && (
          <div className="fixed inset-0 z-40">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <nav className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-[#2a1e3f] shadow-lg p-6">
              <SidebarContent pathname={pathname} />
            </nav>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <nav className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-72 lg:bg-white lg:dark:bg-[#2a1e3f] lg:border-r lg:border-[#e9dff5] lg:dark:border-[#3a2d4f] lg:pb-6">
        <SidebarContent pathname={pathname} />
      </nav>

      {/* Main content */}
      <main className="lg:pl-72">
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1f1a2e]/90 backdrop-blur-md border-b border-[#e9dff5] dark:border-[#3a2d4f]">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="lg:hidden">
              <Image src="/logo.png" alt="Pastel" width={40} height={40} />
            </div>
            <div className="flex items-center space-x-4 ml-auto">
              <ThemeToggle />
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </div>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <>
      <Link href="/" className="flex items-center px-6 pt-6 pb-8">
        <Image src="/logo.png" alt="Pastel" width={40} height={40} className="flex-shrink-0" />
        <span className="text-xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] ml-3">Pastel</span>
      </Link>
      <div className="px-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const isDashboard = item.name === "Dashboard"

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-x-3 px-3 py-2 text-sm font-medium rounded-lg mb-1 transition-colors",
                isDashboard && "bg-[#c4a9db] dark:bg-[#9f7fc0] text-white dark:text-white hover:bg-[#b397d0] dark:hover:bg-[#8a6aad]",
                !isDashboard && isActive && "bg-[#f0e8f7] dark:bg-[#3a2d4f] text-[#6b5c7c] dark:text-[#d8c5f0]",
                !isDashboard && !isActive && "text-[#8a7a9b] dark:text-[#a99bc1] hover:bg-[#f0e8f7] hover:text-[#6b5c7c] dark:hover:bg-[#3a2d4f] dark:hover:text-[#d8c5f0]"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0",
                isDashboard && "text-white dark:text-white"
              )} />
              {item.name}
            </Link>
          )
        })}
      </div>
    </>
  )
}