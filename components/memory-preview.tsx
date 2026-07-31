"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
          Write a letter to your future self
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
            <label className="block text-sm font-medium text-muted-foreground mb-2">Delivery Time</label>
            <Select value={deliveryTime} onValueChange={setDeliveryTime}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-xl">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 week">1 week</SelectItem>
                <SelectItem value="1 month">1 month</SelectItem>
                <SelectItem value="3 months">3 months</SelectItem>
                <SelectItem value="6 months">6 months</SelectItem>
                <SelectItem value="1 year">1 year</SelectItem>
              </SelectContent>
            </Select>
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
