import { Edit3, Clock, Sparkles } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Edit3 className="w-10 h-10 text-[#c4a9db] dark:text-[#9f7fc0]" />,
      title: "Write a memory",
      description: "Capture your thoughts, feelings, and experiences in our beautiful journaling interface.",
    },
    {
      icon: <Clock className="w-10 h-10 text-[#a2d8c0] dark:text-[#7ab5a0]" />,
      title: "Choose a future delivery date",
      description: "Schedule when you want to receive your memory - next week, next year, or on a special date.",
    },
    {
      icon: <Sparkles className="w-10 h-10 text-[#f0c3a0] dark:text-[#d1a078]" />,
      title: "Let AI reflect on it when it's time",
      description: "Our AI provides thoughtful insights on your emotional journey when your memory arrives.",
    },
  ]

  return (
    <section id="how-it-works" className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4 text-center">
          How It Works
        </h2>
        <p className="text-xl text-[#8a7a9b] dark:text-[#a99bc1] mb-16 text-center max-w-3xl mx-auto">
          A simple process to preserve your memories and rediscover them when the time is right.
        </p>

        {/* Fixed height container to prevent layout shift */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#2a1e3f] rounded-2xl p-8 shadow-md border border-[#e9dff5] dark:border-[#3a2d4f] text-center hover:shadow-lg transition-shadow duration-300 how-it-works-card">
              <div>
                {/* Fixed size icon container */}
                <div 
                  className="w-20 h-20 mx-auto bg-[#f9f5f2] dark:bg-[#3a2d4f] rounded-full flex items-center justify-center mb-6"
                  style={{ minHeight: '80px' }} // Ensure consistent height
                >
                  {step.icon}
                </div>
                
                {/* Fixed height text container */}
                <div style={{ minHeight: '120px' }}>
                  <h3 className="text-xl font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-[#8a7a9b] dark:text-[#a99bc1] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="h-0.5 w-24 bg-gradient-to-r from-[#c4a9db] to-[#a2d8c0] dark:from-[#9f7fc0] dark:to-[#7ab5a0] mx-auto"></div>
        </div>
      </div>
    </section>
  )
}
