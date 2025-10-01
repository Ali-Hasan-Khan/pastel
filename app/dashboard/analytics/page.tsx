"use client"


import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LineChart, BarChart, Calendar, Heart, Sparkles, Clock, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingSpinnerWithText } from "@/components/ui/loading-spinner"


interface AnalyticsStats {
  totalMemories: number | 0
  emotionalScore: number | 0
  aiInsights: number | 0
}

interface HeatDay {
  date: string
  score: number
  count: number
}

const scoreToColor = (s: number) =>
  s >= 8 ? '#34d399' :
    s >= 6 ? '#6ee7b7' :
      s >= 4 ? '#fde68a' :
        s >= 2 ? '#fca5a5' :
          s > 0 ? '#f87171' : '#e5e7eb';

export default function AnalyticsPage() {
  const [isLocked, setIsLocked] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [heatmap, setHeatmap] = useState<HeatDay[] | null>(null);
  const [stats, setStats] = useState<AnalyticsStats>({
    totalMemories: 0,
    emotionalScore: 0,
    aiInsights: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch("/api/analytics/stats")
      const result = await response.json()
      if (result.success) {
        setLoading(false)
        setStats(result.data)
        const fetchHeatmap = async () => {
          const res = await fetch('/api/analytics/heatmap');
          const json = await res.json();
          if (json.success) {
            setHeatmap(json.data.days);
          }
        }
        fetchHeatmap()
      }
    }
    fetchStats()
  }, [])

  if (heatmap) {
    console.log("days: ", heatmap.slice(-10))
  }


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
          <SelectTrigger className="text-[#6b5c7c] w-[180px] rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] dark:bg-[#251c36] dark:text-[#d8c5f0]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent className="dark:bg-[#251c36] text-[#6b5c7c] dark:border-[#3a2d4f]">
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
            value: stats.totalMemories,
            change: "",
            icon: Calendar,
          },
          {
            label: "Emotional Score",
            value: stats.emotionalScore,
            change: "",
            icon: Heart,
          },
          {
            label: "AI Insights",
            value: stats.aiInsights,
            change: "",
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
              <p className="flex items-center text-sm text-[#8a7a9b] dark:text-[#a99bc1]">{stat.label}
                {stat.label === "Emotional Score" && (
                  <span className="relative group ml-1">
                    <Info className="w-3 h-3 text-[#c4a9db] dark:text-[#9f7fc0]" />
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-[#6b5c7c] text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                      Emotional Score is an approximate measure of the overall mood in your memories.<br />(0 = negative, 10 = positive).
                    </span>
                  </span>
                )}
              </p>
              <stat.icon className="w-5 h-5 text-[#c4a9db] dark:text-[#9f7fc0]" />
            </div>
            <div className="mt-4 flex items-baseline">
              {isLoading ? <LoadingSpinnerWithText
                text=""
                size="sm"
              /> : <p className="text-2xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0]">
                {stat.value}
              </p>}
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
          {/* Emotional Heatmap Chart */}
          <div className="h-[300px] bg-[#f9f5f2] dark:bg-[#251c36] rounded-lg flex flex-col items-center justify-center relative px-2">
            {!heatmap ? (
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-[#8a7a9b] dark:text-[#a99bc1]">Loading…</p>
              </div>
            ) : (
              <>
                <div className="w-full flex justify-between items-center mt-2">
                  <span className="text-xs text-[#b6a3c7] dark:text-[#a99bc1]">Showing data for the last 365 days</span>
                  <span className="text-xs text-[#b6a3c7] dark:text-[#a99bc1]">{heatmap[heatmap.length - 1]?.date?.slice(0, 4)}</span>
                </div>
                <hr className="w-full border-t border-[#e9dff5] dark:border-[#3a2d4f] my-2 mb-4" />
                <div className="flex-1 flex items-center w-full overflow-x-auto">
                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: `repeat(33, minmax(0, 1fr))`,
                      gridTemplateRows: `repeat(12, minmax(0, 1fr))`,
                      gap: "4px",
                    }}
                  >
                    {Array.from({ length: 33 * 12 }).map((_, idx) => {
                      const dayIdx = idx - (33 * 12 - heatmap.length);
                      const d = heatmap[dayIdx];

                      return (
                        <div
                          key={idx}
                          title={
                            d
                              ? `${d.date} • ${d.score}/10${d.count ? ` (${d.count})` : ""}`
                              : ""
                          }
                          className={`w-3 h-3 rounded transition-colors duration-200 border border-[#e9dff5] dark:border-[#3a2d4f] ${d ? "bg-primary" : "bg-emotional-empty-light dark:bg-emotional-empty"
                            }`}
                          style={{
                            opacity: d
                              ? d.score <= 2
                                ? 0.25
                                : d.score <= 4
                                  ? 0.45
                                  : d.score <= 6
                                    ? 0.65
                                    : d.score <= 8
                                      ? 0.85
                                      : 1
                              : 0.2,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-center items-center m-2 gap-2">
                  <span className="text-xs text-[#b6a3c7] dark:text-[#a99bc1]">Low</span>
                  <div className="flex gap-1">
                    {[0, 2.5, 5, 7.5, 10].map((score) => (
                      <div
                        key={score}
                        className="w-4 h-4 rounded bg-primary"
                        style={{
                          opacity: score <= 2
                            ? 0.25
                            : score <= 4
                              ? 0.45
                              : score <= 6
                                ? 0.65
                                : score <= 8
                                  ? 0.85
                                  : 1,
                        }}
                        title={`${score}/10`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#b6a3c7] dark:text-[#a99bc1]">High</span>
                </div>
                <p className="mb-2 text-xs text-[#8a7a9b] dark:text-[#a99bc1]">Each square represents a day. Color intensity shows emotional positivity.</p>
              </>
            )}
          </div>
        </motion.div>

        {/* Writing Activity */}
        <div className="relative">
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
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-[#2a1e3f]/80 rounded-xl z-10 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-[#f0e8f7] dark:bg-[#3a2d4f] text-[#a99bc1] dark:text-[#d8c5f0] text-xs font-medium border border-[#e9dff5] dark:border-[#3a2d4f] shadow">
                🚧 Work in progress: Writing Activity analytics coming soon!
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative bg-linear-to-br from-[#f0e8f7] to-[#e9f5f0] dark:from-[#3a2d4f] dark:to-[#2d3f35] p-6 rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f]"
        >
          <h3 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4">
            AI Pattern Analysis
          </h3>
          <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
            Your writing shows increased positivity in the past month, with more frequent use of optimistic language and forward-looking statements.
          </p>
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-[#2a1e3f]/80 rounded-xl z-10 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-[#f0e8f7] dark:bg-[#3a2d4f] text-[#a99bc1] dark:text-[#d8c5f0] text-xs font-medium border border-[#e9dff5] dark:border-[#3a2d4f] shadow">
              🚧 Work in progress
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative bg-[#f9f5f2] dark:bg-[#251c36] p-6 rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f]"
        >
          <h3 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4">
            Writing Trends
          </h3>
          <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
            You tend to write longer, more reflective entries during weekends. Most entries focus on personal growth and future aspirations.
          </p>
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-[#2a1e3f]/80 rounded-xl z-10 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-[#f0e8f7] dark:bg-[#3a2d4f] text-[#a99bc1] dark:text-[#d8c5f0] text-xs font-medium border border-[#e9dff5] dark:border-[#3a2d4f] shadow">
              🚧 Work in progress
            </span>
          </div>
        </motion.div>
      </div>
    </div>

  )
}