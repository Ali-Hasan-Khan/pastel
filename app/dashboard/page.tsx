"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { PenLine, Clock, Lock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoadingSpinnerWithText } from "@/components/ui/loading-spinner"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface DashboardStats {
  totalCapsules: number
  upcomingCapsules: number
  deliveredCapsules: number
  recentCapsules: Array<{
    id: string
    title: string
    deliveryDate: string
    status: string
    createdAt: string
  }>
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter()
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchDashboardStats()
    } else if (isLoaded && !isSignedIn) {
      setLoading(false)
    }
  }, [isLoaded, isSignedIn])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await fetch("/api/dashboard/stats")
      const result = await response.json()

      if (result.success) {
        setStats(result.data)
      } else {
        setError(result.error || "Failed to fetch dashboard data")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Show loading state while Clerk loads
  if (!isLoaded) {
    return (

      <div className="space-y-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinnerWithText
            text="Loading your dashboard..."
            size="lg"
          />
        </div>
      </div>

    )
  }

  // Show sign-in prompt if not authenticated
  if (!isSignedIn) {
    return (

      <div className="space-y-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
              Sign In Required
            </h2>
            <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
              Please sign in to view your dashboard.
            </p>
          </div>
        </div>
      </div>

    )
  }

  // Prepare stats for display
  const displayStats = stats ? [
    { name: "Total Capsules", value: stats.totalCapsules.toString(), icon: Lock },
    { name: "Upcoming", value: stats.upcomingCapsules.toString(), icon: Clock },
    { name: "Delivered", value: stats.deliveredCapsules.toString(), icon: Send },
  ] : []

  return (

    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
          Welcome back{user?.firstName ? `, ${user.firstName}` : ''}
        </h1>
        <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
          What would you like to preserve today?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/dashboard/compose">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-linear-to-br from-[#f0e8f7] to-[#e9f5f0] dark:from-[#3a2d4f] dark:to-[#2d3f35] p-6 rounded-2xl border border-[#c4a9db] dark:border-[#9f7fc0] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <PenLine className="w-8 h-8 text-[#c4a9db] dark:text-[#9f7fc0] mb-4" />
            <h3 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
              Create New Capsule
            </h3>
            <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1]">
              Write a letter, save a memory, or capture your current thoughts.
            </p>
          </motion.div>
        </Link>

        <Link href="/dashboard/upcoming">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-[#2a1e3f] p-6 rounded-2xl border border-[#e9dff5] dark:border-[#3a2d4f] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <Clock className="w-8 h-8 text-[#a2d8c0] dark:text-[#7ab5a0] mb-4" />
            <h3 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
              View Timeline
            </h3>
            <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1]">
              Check when your next memories will be unlocked.
            </p>
          </motion.div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#2a1e3f] p-6 rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f] animate-pulse"
            >
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 bg-[#e9dff5] dark:bg-[#3a2d4f] rounded mr-2"></div>
                <div className="w-20 h-4 bg-[#e9dff5] dark:bg-[#3a2d4f] rounded"></div>
              </div>
              <div className="w-8 h-8 bg-[#e9dff5] dark:bg-[#3a2d4f] rounded"></div>
            </div>
          ))
        ) : error ? (
          <div className="col-span-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <Button
              onClick={fetchDashboardStats}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        ) : (
          displayStats.map((stat) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#2a1e3f] p-6 rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f]"
            >
              <div className="flex items-center">
                <stat.icon className="w-5 h-5 text-[#c4a9db] dark:text-[#9f7fc0] mr-2" />
                <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1]">{stat.name}</p>
              </div>
              <p className="text-2xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mt-2">
                {stat.value}
              </p>
            </motion.div>
          ))
        )}
      </div>

      {/* Recent Capsules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#6b5c7c] dark:text-[#d8c5f0]">
            Recent Capsules
          </h2>
          {stats && stats.recentCapsules.length > 0 && (
            <Link href="/dashboard/upcoming">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
              >
                View All
              </Button>
            </Link>
          )}
        </div>

        <div className="bg-white dark:bg-[#2a1e3f] rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f] overflow-hidden">
          {loading ? (
            // Loading skeleton for recent capsules
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`p-4 animate-pulse ${i !== 2 ? "border-b border-[#e9dff5] dark:border-[#3a2d4f]" : ""
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="w-32 h-5 bg-[#e9dff5] dark:bg-[#3a2d4f] rounded mb-2"></div>
                    <div className="w-24 h-4 bg-[#e9dff5] dark:bg-[#3a2d4f] rounded"></div>
                  </div>
                  <div className="w-12 h-8 bg-[#e9dff5] dark:bg-[#3a2d4f] rounded"></div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="p-4 text-center">
              <p className="text-[#8a7a9b] dark:text-[#a99bc1]">Failed to load recent capsules</p>
            </div>
          ) : stats && stats.recentCapsules.length > 0 ? (
            stats.recentCapsules.map((capsule, i) => (
              <motion.div
                key={capsule.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 flex items-center justify-between ${i !== stats.recentCapsules.length - 1
                  ? "border-b border-[#e9dff5] dark:border-[#3a2d4f]"
                  : ""
                  }`}
              >
                <div>
                  <h3 className="font-medium text-[#6b5c7c] dark:text-[#d8c5f0]">
                    {capsule.title}
                  </h3>
                  <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1]">
                    Delivery: {new Date(capsule.deliveryDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${new Date(capsule.deliveryDate) <= new Date()
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    }`}>
                    {new Date(capsule.deliveryDate) <= new Date() ? 'Ready' : 'Scheduled'}
                  </span>
                  <Button
                    onClick={() => {
                      router.push(`/dashboard/capsules/${capsule.id}`)
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                  >
                    View
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Lock className="w-12 h-12 text-[#c4a9db] dark:text-[#9f7fc0] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
                No Capsules Yet
              </h3>
              <p className="text-[#8a7a9b] dark:text-[#a99bc1] mb-4">
                Start your journey by creating your first time capsule.
              </p>
              <Link href="/dashboard/compose">
                <Button className="bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] rounded-xl">
                  Create Your First Capsule
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>

  )
}