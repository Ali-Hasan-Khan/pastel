"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"

export default function MemoryPreview() {
  const [deliveryTime, setDeliveryTime] = useState("1 month")

  return (
    <motion.div
      className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 md:p-8">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">
          Write a letter to your{" "}
          <span className="font-display italic font-normal text-gradient">future self</span>
        </h3>
        <p className="mt-2 text-muted-foreground">
          Capture your thoughts, feelings, and experiences. We&apos;ll deliver it back to you later.
        </p>
      </div>

      <div className="p-6 md:p-8">
        <Textarea
          placeholder="Dear future me..."
          className="min-h-[200px] text-lg p-4 rounded-xl border-border focus:border-primary focus:ring-primary"
        />

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto">
            <label htmlFor="delivery-time" className="block text-sm font-medium text-muted-foreground mb-2">Delivery Time</label>
            <select
              id="delivery-time"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-xl border border-input bg-card px-3 py-2 text-sm shadow-xs focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary sm:w-[180px]"
            >
              <option value="1 week">1 week</option>
              <option value="1 month">1 month</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
              <option value="1 year">1 year</option>
            </select>
          </div>

          <div className="mt-auto w-full sm:w-auto">
            <Button className="w-full sm:w-auto rounded-xl px-8">
              Schedule
            </Button>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p>
            Your memories are encrypted and only accessible to you. Learn more about our{" "}
            <span className="font-medium text-primary hover:underline cursor-pointer">privacy policy</span>.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
