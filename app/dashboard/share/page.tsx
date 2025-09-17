"use client"


import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion } from "framer-motion"
import { Share2, Globe, Lock, Copy, Settings, Users, Clock } from "lucide-react"

export default function SharePage() {
  const [isLocked, setIsLocked] = useState(true)
  return (
      <div className="max-w-4xl mx-auto space-y-8 relative">
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
        <div>
          <h1 className="text-3xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
            Shared Memories
          </h1>
          <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
            Manage your shared capsules and public collections.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-linear-to-br from-[#f0e8f7] to-[#e9f5f0] dark:from-[#3a2d4f] dark:to-[#2d3f35] p-6 rounded-2xl border border-[#c4a9db] dark:border-[#9f7fc0]"
          >
            <Globe className="w-8 h-8 text-[#c4a9db] dark:text-[#9f7fc0] mb-4" />
            <h3 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
              Public Collection
            </h3>
            <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1] mb-4">
              Create a curated collection of memories to share with the world.
            </p>
            <Button
              variant="secondary"
              className="rounded-xl bg-white/20 hover:bg-white/30 dark:bg-black/20 dark:hover:bg-black/30 text-[#6b5c7c] dark:text-[#d8c5f0]"
            >
              Create Collection
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-[#2a1e3f] p-6 rounded-2xl border border-[#e9dff5] dark:border-[#3a2d4f]"
          >
            <Users className="w-8 h-8 text-[#a2d8c0] dark:text-[#7ab5a0] mb-4" />
            <h3 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
              Private Sharing
            </h3>
            <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1] mb-4">
              Share specific memories with friends or family members.
            </p>
            <Button
              variant="outline"
              className="rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
            >
              Share Memory
            </Button>
          </motion.div>
        </div>

        {/* Shared Items */}
        <div>
          <h2 className="text-xl font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4">
            Currently Shared
          </h2>
          <div className="bg-white dark:bg-[#2a1e3f] rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f] overflow-hidden">
            {[
              {
                title: "2024 Reflections",
                type: "collection",
                visibility: "public",
                views: 145,
                url: "pastel.app/c/2024-reflections",
              },
              {
                title: "Dear Future Family",
                type: "memory",
                visibility: "private",
                sharedWith: 3,
                url: "pastel.app/m/dear-future-family",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`p-6 ${
                  index !== 0 ? "border-t border-[#e9dff5] dark:border-[#3a2d4f]" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {item.visibility === "public" ? (
                        <Globe className="w-4 h-4 text-[#c4a9db] dark:text-[#9f7fc0]" />
                      ) : (
                        <Lock className="w-4 h-4 text-[#a2d8c0] dark:text-[#7ab5a0]" />
                      )}
                      <h3 className="font-medium text-[#6b5c7c] dark:text-[#d8c5f0]">
                        {item.title}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#f0e8f7] dark:bg-[#3a2d4f] text-[#8a7a9b] dark:text-[#a99bc1]">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1] mb-4">
                      {item.visibility === "public"
                        ? `${item.views} views`
                        : `Shared with ${item.sharedWith} people`}
                    </p>
                    <div className="flex items-center gap-2 p-2 bg-[#f9f5f2] dark:bg-[#251c36] rounded-lg">
                      <code className="text-sm text-[#8a7a9b] dark:text-[#a99bc1]">
                        {item.url}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#c4a9db] hover:text-[#b397d0] dark:text-[#9f7fc0] dark:hover:text-[#8a6aad]"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="bg-[#f9f5f2] dark:bg-[#251c36] rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#a2d8c0] dark:text-[#7ab5a0] mt-1" />
            <div>
              <h3 className="font-medium text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
                Privacy First
              </h3>
              <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1]">
                Even when sharing memories, they remain encrypted and you maintain full control over who can access them. You can revoke access at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    
  )
}