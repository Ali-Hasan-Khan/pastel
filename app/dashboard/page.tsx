"use client"

import { PenLine, Clock, Lock, Send } from "lucide-react"
import DashboardLayout from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export default function DashboardPage() {
  // In a real app, these would come from your API
  const stats = [
    { name: "Total Capsules", value: "12", icon: Lock },
    { name: "Upcoming", value: "5", icon: Clock },
    { name: "Delivered", value: "7", icon: Send },
  ]

  const recentCapsules = [
    {
      id: "1",
      title: "Letter to future me",
      deliveryDate: "2025-06-15",
      status: "scheduled",
    },
    {
      id: "2",
      title: "Birthday reflection",
      deliveryDate: "2025-05-20",
      status: "scheduled",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
            Welcome back
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
              className="bg-white dark:bg-[#2a1e3f] p-6 rounded-2xl border border-[#e9dff5] dark:border-[#3a2d4f] shadow-sm hover:shadow-md transition-shadow cursor-point</motion.div>er"
            >
              <Clock className="w-8 h-8 text-[#a2d8c0] dark:text-[#7ab5a0] mb-4" />
              <h3 className="text-lg font-semibold text-[#6b5c7c</h3>] dark:text-[#d8c5f0] mb-2">
                View Timeline
              </h3>
              <p className="tex</p>t-sm text-[#8a7a9b] dark:text-[#a99bc1]">
                Check when your next memories will be unlocked.
              </p>
            </motion.div>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white dark:bg-[#2a1e3f] p-6 rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f]"
            >
              <div className="flex items-center">
                <stat.icon className="w-5 h-5 text-[#c4a9db] dark:text-[#9f7fc0] mr-2" />
                <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1]">{stat.name}</p>
              </div>
              <p className="text-2xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mt-2">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Capsules */}
        <div>
          <h2 className="text-xl font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4">
            Recent Capsules
          </h2>
          <div className="bg-white dark:bg-[#2a1e3f] rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f] overflow-hidden">
            {recentCapsules.map((capsule, i) => (
              <div
                key={capsule.id}
                className={`p-4 flex items-center justify-between ${
                  i !== recentCapsules.length - 1
                    ? "border-b border-[#e9dff5] dark:border-[#3a2d4f]"
                    : ""
                }`}
              >
                <div>
                  <h3 className="font-medium text-[#6b5c7c] dark:text-[#d8c5f0]">
                    {capsule.title}
                  </h3>
                  <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1]">
                    Delivery: {new Date(capsule.deliveryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}