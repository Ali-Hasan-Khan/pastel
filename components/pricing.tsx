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
      price: { monthly: 0, yearly: 0 },
      features: ["5 memories per month", "Basic delivery scheduling", "7-day memory history", "Simple AI reflections"],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Premium",
      description: "Our most popular plan for memory keepers",
      price: { monthly: 9.99, yearly: 7.99 },
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
    },
    {
      name: "Ultimate",
      description: "For the dedicated memory archivist",
      price: { monthly: 19.99, yearly: 15.99 },
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
    },
  ]

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-accent/50 px-4 py-1.5 text-sm font-medium text-muted-foreground">
          Simple pricing
        </span>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Choose Your Journey
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Select the perfect plan to preserve your memories and emotional journey.
        </p>
      </motion.div>

      <div className="flex justify-center mt-10">
        <div className="inline-flex items-center gap-1 rounded-xl border border-border bg-muted p-1">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              billingCycle === "monthly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              billingCycle === "yearly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Yearly <span className="text-primary font-semibold">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`relative flex flex-col rounded-2xl border bg-card ${
              plan.highlighted
                ? "border-primary shadow-lg md:-mt-4 md:mb-4"
                : "border-border"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                Most Popular
              </div>
            )}
            <div className="flex flex-col p-6">
              <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-foreground">
                  ${plan.price[billingCycle].toFixed(2)}
                </span>
                <span className="ml-1.5 text-sm text-muted-foreground">
                  {plan.price[billingCycle] > 0
                    ? `/ ${billingCycle === "monthly" ? "month" : "month, billed yearly"}`
                    : "forever"}
                </span>
              </div>
              <Button
                className={`mt-6 w-full rounded-xl ${
                  plan.highlighted
                    ? ""
                    : "variant-outline"
                }`}
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </div>
            <div className="border-t border-border p-6">
              <p className="mb-4 text-sm font-medium text-foreground">What&apos;s included:</p>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-muted-foreground">
          Have questions about our plans?{" "}
          <a href="#faq" className="font-medium text-primary hover:underline">
            Check our FAQ
          </a>
          {" "}or{" "}
          <a href="#contact" className="font-medium text-primary hover:underline">
            contact us
          </a>
          .
        </p>
      </motion.div>
    </section>
  )
}
