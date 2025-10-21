import { Paintbrush, Calendar, Sparkles, BarChart4 } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Paintbrush className="w-6 h-6 text-[#c4a9db] dark:text-[#9f7fc0]" />,
      title: "Beautiful UI for journaling",
      description: "A calming, distraction-free environment designed to help you express your thoughts and feelings.",
    },
    {
      icon: <Calendar className="w-6 h-6 text-[#a2d8c0] dark:text-[#7ab5a0]" />,
      title: "Schedule future deliveries",
      description: "Choose when your memories will be delivered back to you - from days to years in the future.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#f0c3a0] dark:text-[#d1a078]" />,
      title: "AI reflections over time",
      description: "Receive thoughtful AI-generated insights about your emotional journey when memories are delivered.",
    },
    {
      icon: <BarChart4 className="w-6 h-6 text-[#c4a9db] dark:text-[#9f7fc0]" />,
      title: "Emotional tracking heatmap",
      description: "Visualize your emotional patterns and growth over time with our intuitive heatmap.",
    },
  ]

  return (
    <section id="features" className="container mx-auto px-4 py-16 md:py-24 bg-[#f9f5f2] dark:bg-[#1f1a2e] rounded-2xl">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4 text-center">Features</h2>
        <p className="text-xl text-[#8a7a9b] dark:text-[#a99bc1] mb-16 text-center max-w-3xl mx-auto">
          Tools designed to help you capture, preserve, and reflect on your personal journey.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#2a1e3f] rounded-2xl p-8 shadow-md border border-[#e9dff5] dark:border-[#3a2d4f] flex hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mr-6 mt-1">
                <div className="w-12 h-12 bg-[#f0e8f7] dark:bg-[#3a2d4f] rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">{feature.title}</h3>
                <p className="text-[#8a7a9b] dark:text-[#a99bc1]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
