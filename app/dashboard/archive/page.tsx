"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Filter, Search, Calendar, MailOpen, Download, MessageSquare } from "lucide-react"

export default function ArchivePage() {
  const [view, setView] = useState("grid")
  const [sortBy, setSortBy] = useState("newest")

  // This would come from your API in a real app
  const memories = [
    {
      id: "1",
      title: "New Year's Resolutions 2024",
      preview: "Looking back at my goals and dreams...",
      deliveryDate: "2024-12-31",
      openedDate: "2024-12-31",
      hasAiReflection: true,
      tags: ["goals", "reflection"],
    },
    {
      id: "2",
      title: "Dear Future Self",
      preview: "A letter about current challenges...",
      deliveryDate: "2024-11-15",
      openedDate: "2024-11-15",
      hasAiReflection: true,
      tags: ["personal", "growth"],
    },
    {
      id: "3",
      title: "Summer Memories",
      preview: "Capturing the highlights of summer...",
      deliveryDate: "2024-09-01",
      openedDate: "2024-09-01",
      hasAiReflection: true,
      tags: ["memories", "summer"],
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
              Memory Archive
            </h1>
            <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
              Browse and search through all your past memories.
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Archive
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[240px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8a7a9b] dark:text-[#a99bc1]" />
              <input
                type="search"
                placeholder="Search memories..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f] bg-white dark:bg-[#2a1e3f] text-[#6b5c7c] dark:text-[#d8c5f0] placeholder:text-[#8a7a9b] dark:placeholder:text-[#a99bc1] focus:outline-none focus:ring-2 focus:ring-[#c4a9db] dark:focus:ring-[#9f7fc0]"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px] rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] dark:bg-[#2a1e3f] dark:text-[#d8c5f0]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="dark:bg-[#2a1e3f] dark:border-[#3a2d4f]">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={view === "grid" ? "default" : "outline"}
              className="rounded-xl"
              onClick={() => setView("grid")}
            >
              Grid
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              className="rounded-xl"
              onClick={() => setView("list")}
            >
              List
            </Button>
          </div>
        </div>

        {/* Memories Grid */}
        <div className={view === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-[#2a1e3f] rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f] overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-1">
                      {memory.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-[#8a7a9b] dark:text-[#a99bc1]">
                      <Calendar className="w-4 h-4" />
                      <span>Opened {new Date(memory.openedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                  <MailOpen className="w-5 h-5 text-[#c4a9db] dark:text-[#9f7fc0]" />
                </div>

                <p className="text-[#8a7a9b] dark:text-[#a99bc1] text-sm mb-4 line-clamp-2">
                  {memory.preview}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {memory.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full bg-[#f0e8f7] dark:bg-[#3a2d4f] text-[#8a7a9b] dark:text-[#a99bc1]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {memory.hasAiReflection && (
                    <MessageSquare className="w-4 h-4 text-[#a2d8c0] dark:text-[#7ab5a0]" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}