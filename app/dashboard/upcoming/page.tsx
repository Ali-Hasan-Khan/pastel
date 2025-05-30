"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import DashboardLayout from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Clock, Calendar, Lock } from "lucide-react"

interface Capsule {
  id: string
  title: string
  content: string
  deliveryDate: string
  remainingDays: number
  status: string
  createdAt: string
}

export default function UpcomingPage() {
  const [capsules, setCapsules] = useState<Capsule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { isLoaded, isSignedIn } = useUser()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchUpcomingCapsules()
    } else if (isLoaded && !isSignedIn) {
      setLoading(false)
    }
  }, [isLoaded, isSignedIn])

  const fetchUpcomingCapsules = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await fetch("/api/capsules/upcoming")
      const result = await response.json()
      
      if (result.success) {
        setCapsules(result.data)
      } else {
        setError(result.error || "Failed to fetch capsules")
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
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-[#8a7a9b] dark:text-[#a99bc1]">Loading...</div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Show sign-in prompt if not authenticated
  if (!isSignedIn) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
                Sign In Required
              </h2>
              <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
                Please sign in to view your upcoming capsules.
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
            Upcoming Capsules
          </h1>
          <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
            Your memories waiting to be unlocked.
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-[#8a7a9b] dark:text-[#a99bc1]">Loading your capsules...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <Button 
              onClick={fetchUpcomingCapsules}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && capsules.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-[#f0e8f7] dark:bg-[#3a2d4f] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-[#c4a9db] dark:text-[#9f7fc0]" />
            </div>
            <h3 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
              No Upcoming Capsules
            </h3>
            <p className="text-[#8a7a9b] dark:text-[#a99bc1] mb-4">
              You haven't created any time capsules yet. Start your journey!
            </p>
            <Button 
              onClick={() => window.location.href = '/dashboard/compose'}
              className="bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] rounded-xl"
            >
              Create Your First Capsule
            </Button>
          </div>
        )}

        <div className="grid gap-6">
          {capsules.map((capsule, index) => (
            <motion.div
              key={capsule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-[#2a1e3f] rounded-2xl border border-[#e9dff5] dark:border-[#3a2d4f] overflow-hidden"
            >
              <div className="p-6 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-[#c4a9db] dark:text-[#9f7fc0]" />
                    <h2 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] truncate">
                      {capsule.title}
                    </h2>
                  </div>
                  <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1] mb-4 line-clamp-2">
                    {capsule.content}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-[#8a7a9b] dark:text-[#a99bc1]">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Opens {new Date(capsule.deliveryDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[#a2d8c0] dark:text-[#7ab5a0]">
                      <Clock className="w-4 h-4" />
                      <span>
                        {capsule.remainingDays === 1 
                          ? "1 day remaining" 
                          : `${capsule.remainingDays} days remaining`}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="shrink-0 rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                >
                  View Details
                </Button>
              </div>
              <div className="h-2 bg-[#f0e8f7] dark:bg-[#3a2d4f]">
                <div
                  className="h-full bg-[#c4a9db] dark:bg-[#9f7fc0] transition-all duration-300"
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(100, (capsule.remainingDays / 365) * 100)
                    )}%`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {capsules.length > 0 && (
          <div className="flex justify-center pt-8">
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl border-[#c4a9db] text-[#6b5c7c] hover:bg-[#f0e8f7] dark:border-[#9f7fc0] dark:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
            >
              View Calendar View
              <Calendar className="ml-2 w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}