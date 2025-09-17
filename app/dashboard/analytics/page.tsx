"use client"


import { useState } from "react"
import { motion } from "framer-motion"
import { LineChart, BarChart, Calendar, Heart, Sparkles, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsPage() {
  const [isLocked, setIsLocked] = useState(true)
  return (
      <div className="max-w-6xl mx-auto space-y-8 relative">
        {isLocked && (
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute inset-0 m-8 flex items-center justify-center backdrop-blur-sm rounded-md bg-[#c4a9db]/50 z-0">
                <div className="flex text-center justify-center font-bold text-[#6b5c7c] dark:text-[#d8c5f0]">
                  <Clock className="w-5 h-5 mr-2" /> Work in Progress
                </div>
              </motion.div>
            )}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
              Memory Analytics
            </h1>
            <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
              Track your emotional journey and writing patterns.
            </p>
          </div>
          <Select defaultValue="year">
            <SelectTrigger className="w-[180px] rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] dark:bg-[#251c36] dark:text-[#d8c5f0]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="dark:bg-[#251c36] dark:border-[#3a2d4f]">
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: "Total Memories",
              value: "47",
              change: "+12%",
              icon: Calendar,
            },
            {
              label: "Emotional Score",
              value: "8.2",
              change: "+0.5",
              icon: Heart,
            },
            {
              label: "AI Insights",
              value: "24",
              change: "+8",
              icon: Sparkles,
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#2a1e3f] p-6 rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f]"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1]">{stat.label}</p>
                <stat.icon className="w-5 h-5 text-[#c4a9db] dark:text-[#9f7fc0]" />
              </div>
              <div className="mt-4 flex items-baseline">
                <p className="text-2xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0]">
                  {stat.value}
                </p>
                <span className="ml-2 text-sm text-[#a2d8c0] dark:text-[#7ab5a0]">
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Emotional Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-[#2a1e3f] p-6 rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f]"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0]">
                Emotional Heatmap
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
              >
                <LineChart className="w-4 h-4 mr-1" /> View Details
              </Button>
            </div>
            {/* Placeholder for chart */}
            <div className="h-[300px] bg-[#f9f5f2] dark:bg-[#251c36] rounded-lg flex items-center justify-center">
              <p className="text-[#8a7a9b] dark:text-[#a99bc1]">Emotional Pattern Chart</p>
            </div>
          </motion.div>

          {/* Writing Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-[#2a1e3f] p-6 rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f]"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0]">
                Writing Activity
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
              >
                <BarChart className="w-4 h-4 mr-1" /> View Details
              </Button>
            </div>
            {/* Placeholder for chart */}
            <div className="h-[300px] bg-[#f9f5f2] dark:bg-[#251c36] rounded-lg flex items-center justify-center">
              <p className="text-[#8a7a9b] dark:text-[#a99bc1]">Activity Graph</p>
            </div>
          </motion.div>
        </div>

        {/* Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-linear-to-br from-[#f0e8f7] to-[#e9f5f0] dark:from-[#3a2d4f] dark:to-[#2d3f35] p-6 rounded-xl border border-[#c4a9db] dark:border-[#9f7fc0]"
          >
            <h3 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4">
              AI Pattern Analysis
            </h3>
            <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
              Your writing shows increased positivity in the past month, with more frequent use of optimistic language and forward-looking statements.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#f9f5f2] dark:bg-[#251c36] p-6 rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f]"
          >
            <h3 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4">
              Writing Trends
            </h3>
            <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
              You tend to write longer, more reflective entries during weekends. Most entries focus on personal growth and future aspirations.
            </p>
          </motion.div>
        </div>
      </div>
    
  )
}