"use client"

import DashboardLayout from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Clock, Calendar, Lock } from "lucide-react"

export default function UpcomingPage() {
  // This would come from your API in a real app
  const upcomingCapsules = [
    {
      id: "1",
      title: "Letter to future me",
      content: "A reflection on my current goals and dreams...",
      deliveryDate: "2025-06-15",
      remainingDays: 45,
    },
    {
      id: "2",
      title: "Birthday reflection",
      content: "Thoughts about turning 30...",
      deliveryDate: "2025-05-20",
      remainingDays: 20,
    },
    {
      id: "3",
      title: "Time Capsule 2025",
      content: "Predictions and hopes for the next year...",
      deliveryDate: "2026-01-01",
      remainingDays: 240,
    },
  ]

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

        <div className="grid gap-6">
          {upcomingCapsules.map((capsule, index) => (
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
                        Opens {new Date(capsule.deliveryDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[#a2d8c0] dark:text-[#7ab5a0]">
                      <Clock className="w-4 h-4" />
                      <span>{capsule.remainingDays} days remaining</span>
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
      </div>
    </DashboardLayout>
  )
}