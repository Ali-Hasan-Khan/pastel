"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Calendar, Image as ImageIcon, Smile, Send } from "lucide-react"

export default function ComposePage() {
  const [deliveryTime, setDeliveryTime] = useState("1 month")

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
            Create New Time Capsule
          </h1>
          <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
            Write something for your future self to discover.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#2a1e3f] rounded-2xl border border-[#e9dff5] dark:border-[#3a2d4f] overflow-hidden"
        >
          <div className="p-6 md:p-8 bg-linear-to-r from-[#f0e8f7] to-[#e9f5f0] dark:from-[#3a2d4f] dark:to-[#2d3f35]">
            <input
              type="text"
              placeholder="Title your memory..."
              className="w-full bg-transparent border-none text-xl font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] placeholder:text-[#8a7a9b] dark:placeholder:text-[#a99bc1] focus:outline-none focus:ring-0"
            />
          </div>

          <div className="p-6 md:p-8">
            <Textarea
              placeholder="Dear future me..."
              className="min-h-[300px] text-lg p-4 rounded-xl border-[#e9dff5] focus:border-[#c4a9db] focus:ring-[#c4a9db] dark:border-[#3a2d4f] dark:bg-[#251c36] dark:text-[#d8c5f0] dark:placeholder:text-[#8a7a9b] dark:focus:border-[#9f7fc0] dark:focus:ring-[#9f7fc0] resize-none"
            />

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-[#8a7a9b] dark:text-[#a99bc1] mb-2">
                  When should this be delivered?
                </label>
                <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                  <SelectTrigger className="w-full rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] dark:bg-[#251c36] dark:text-[#d8c5f0]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-[#251c36] dark:border-[#3a2d4f]">
                    <SelectItem value="1 week">1 week</SelectItem>
                    <SelectItem value="1 month">1 month</SelectItem>
                    <SelectItem value="3 months">3 months</SelectItem>
                    <SelectItem value="6 months">6 months</SelectItem>
                    <SelectItem value="1 year">1 year</SelectItem>
                    <SelectItem value="custom">Custom date...</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                >
                  <Calendar className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                >
                  <ImageIcon className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                >
                  <Smile className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                size="lg"
                className="rounded-xl bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] px-8"
              >
                Schedule Delivery
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="bg-[#f9f5f2] dark:bg-[#251c36] rounded-xl p-4 text-[#8a7a9b] dark:text-[#a99bc1] text-sm">
          <p>
            <span className="font-medium">Privacy note:</span> Your memories are encrypted and only accessible to you.
            Learn more about our{" "}
            <span className="text-[#c4a9db] dark:text-[#9f7fc0] hover:underline cursor-pointer">
              privacy policy
            </span>
            .
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}