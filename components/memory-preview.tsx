"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

export default function MemoryPreview() {
  const [deliveryTime, setDeliveryTime] = useState("1 month")

  return (
    <motion.div
      className="bg-white dark:bg-[#2a1e3f] rounded-3xl shadow-lg border border-[#e9dff5] dark:border-[#3a2d4f] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="p-6 md:p-8 bg-linear-to-r from-[#f0e8f7] to-[#e9f5f0] dark:from-[#3a2d4f] dark:to-[#2d3f35]">
        <h3 className="text-2xl font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
          Write a letter to your future self
        </h3>
        <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
          Capture your thoughts, feelings, and experiences. We'll deliver it back to you later.
        </p>
      </div>

      <div className="p-6 md:p-8">
        <Textarea
          placeholder="Dear future me..."
          className="min-h-[200px] text-lg p-4 rounded-xl border-[#e9dff5] focus:border-[#c4a9db] focus:ring-[#c4a9db] dark:border-[#3a2d4f] dark:bg-[#251c36] dark:text-[#d8c5f0] dark:placeholder:text-[#8a7a9b] dark:focus:border-[#9f7fc0] dark:focus:ring-[#9f7fc0]"
        />

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-[#8a7a9b] dark:text-[#a99bc1] mb-2">Delivery Time</label>
            <Select value={deliveryTime} onValueChange={setDeliveryTime}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] dark:bg-[#251c36] dark:text-[#d8c5f0]">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent className="dark:bg-[#251c36] dark:border-[#3a2d4f]">
                <SelectItem value="1 week">1 week</SelectItem>
                <SelectItem value="1 month">1 month</SelectItem>
                <SelectItem value="3 months">3 months</SelectItem>
                <SelectItem value="6 months">6 months</SelectItem>
                <SelectItem value="1 year">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-auto w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] rounded-xl px-8">
              Schedule
            </Button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-[#f9f5f2] dark:bg-[#251c36] rounded-xl text-[#8a7a9b] dark:text-[#a99bc1] text-sm">
          <p>
            <span className="font-medium">Privacy note:</span> Your memories are encrypted and only accessible to you.
            Learn more about our{" "}
            <span className="text-[#c4a9db] dark:text-[#9f7fc0] hover:underline cursor-pointer">privacy policy</span>.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
