"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      quote: "I cried reading what I wrote to myself a year ago. Thank you, Pastel.",
      author: "Sarah K.",
      role: "Designer",
    },
    {
      quote: "The AI reflections helped me see patterns in my emotional journey I never noticed before.",
      author: "Michael T.",
      role: "Teacher",
    },
    {
      quote: "Such a beautiful way to document my life's journey and reflect on my growth.",
      author: "Jamie L.",
      role: "Writer",
    },
  ]

  return (
    <section id="testimonials" className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4 text-center">
          What People Are Saying
        </h2>
        <p className="text-xl text-[#8a7a9b] dark:text-[#a99bc1] mb-16 text-center max-w-3xl mx-auto">
          Join thousands who are preserving their memories with Pastel.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-[#2a1e3f] rounded-2xl p-8 shadow-md border border-[#e9dff5] dark:border-[#3a2d4f] flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Quote className="w-10 h-10 text-[#c4a9db] dark:text-[#9f7fc0] mb-4" />
              <p className="text-[#6b5c7c] dark:text-[#d8c5f0] mb-6 grow italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-[#6b5c7c] dark:text-[#d8c5f0]">{testimonial.author}</p>
                <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1]">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
