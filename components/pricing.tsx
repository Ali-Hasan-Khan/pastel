"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Free",
      description: "For those just starting their memory journey",
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: ["5 memories per month", "Basic delivery scheduling", "7-day memory history", "Simple AI reflections"],
      cta: "Get Started",
      highlighted: false,
      bgColor: "bg-white dark:bg-[#2a1e3f]",
      borderColor: "border-[#e9dff5] dark:border-[#3a2d4f]",
    },
    {
      name: "Premium",
      description: "Our most popular plan for memory keepers",
      price: {
        monthly: 9.99,
        yearly: 7.99,
      },
      features: [
        "Unlimited memories",
        "Advanced scheduling options",
        "Unlimited memory history",
        "Enhanced AI reflections",
        "Emotional tracking heatmap",
        "Priority delivery",
      ],
      cta: "Start Premium",
      highlighted: true,
      bgColor: "bg-linear-to-br from-[#f0e8f7] to-[#e9f5f0] dark:from-[#3a2d4f] dark:to-[#2d3f35]",
      borderColor: "border-[#c4a9db] dark:border-[#9f7fc0]",
    },
    {
      name: "Ultimate",
      description: "For the dedicated memory archivist",
      price: {
        monthly: 19.99,
        yearly: 15.99,
      },
      features: [
        "Everything in Premium",
        "Family sharing (up to 5 users)",
        "Advanced emotional analytics",
        "Custom delivery themes",
        "Memory collections & organization",
        "Priority support",
        "Early access to new features",
      ],
      cta: "Start Ultimate",
      highlighted: false,
      bgColor: "bg-white dark:bg-[#2a1e3f]",
      borderColor: "border-[#e9dff5] dark:border-[#3a2d4f]",
    },
  ]

  return (
    <section id="pricing" className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4 text-center">
          Choose Your Journey
        </h2>
        <p className="text-xl text-[#8a7a9b] dark:text-[#a99bc1] mb-12 text-center max-w-3xl mx-auto">
          Select the perfect plan to preserve your memories and emotional journey.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#f9f5f2] dark:bg-[#251c36] p-1 rounded-xl inline-flex">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                billingCycle === "monthly"
                  ? "bg-white dark:bg-[#3a2d4f] text-[#6b5c7c] dark:text-[#d8c5f0] shadow-xs"
                  : "bg-transparent text-[#8a7a9b] dark:text-[#a99bc1] hover:text-[#6b5c7c] dark:hover:text-[#d8c5f0]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                billingCycle === "yearly"
                  ? "bg-white dark:bg-[#3a2d4f] text-[#6b5c7c] dark:text-[#d8c5f0] shadow-xs"
                  : "bg-transparent text-[#8a7a9b] dark:text-[#a99bc1] hover:text-[#6b5c7c] dark:hover:text-[#d8c5f0]"
              }`}
            >
              Yearly <span className="text-[#a2d8c0] dark:text-[#7ab5a0]">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`rounded-3xl shadow-md ${plan.bgColor} ${
                plan.highlighted ? "border-2" : "border"
              } ${plan.borderColor} overflow-hidden relative ${plan.highlighted ? "md:-mt-4 md:mb-4" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.highlighted && (
                <div className="bg-[#c4a9db] dark:bg-[#9f7fc0] text-white text-xs font-medium py-1 px-3 absolute right-4 top-4 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">{plan.name}</h3>
                <p className="text-[#8a7a9b] dark:text-[#a99bc1] mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0]">
                    ${plan.price[billingCycle].toFixed(2)}
                  </span>
                  <span className="text-[#8a7a9b] dark:text-[#a99bc1] ml-2">
                    {plan.price[billingCycle] > 0
                      ? `/ ${billingCycle === "monthly" ? "month" : "month, billed yearly"}`
                      : "forever"}
                  </span>
                </div>

                <Button
                  className={`w-full rounded-xl py-6 ${
                    plan.highlighted
                      ? "bg-[#c4a9db] hover:bg-[#b397d0] dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] text-white"
                      : "bg-[#f0e8f7] hover:bg-[#e2d5f0] dark:bg-[#3a2d4f] dark:hover:bg-[#4a3d5f] text-[#6b5c7c] dark:text-[#d8c5f0]"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>

              <div className="p-8 border-t border-[#e9dff5] dark:border-[#3a2d4f]">
                <p className="font-medium text-[#6b5c7c] dark:text-[#d8c5f0] mb-4">What's included:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-[#a2d8c0] dark:text-[#7ab5a0] mr-3 mt-0.5 shrink-0" />
                      <span className="text-[#8a7a9b] dark:text-[#a99bc1]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Teaser */}
        <div className="mt-16 text-center">
          <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
            Have questions about our plans?{" "}
            <a href="#faq" className="text-[#c4a9db] dark:text-[#9f7fc0] hover:underline">
              Check our FAQ
            </a>{" "}
            or{" "}
            <a href="#contact" className="text-[#c4a9db] dark:text-[#9f7fc0] hover:underline">
              contact us
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
