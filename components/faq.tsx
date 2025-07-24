
import * as React from "react"

const faqs = [
    {
        question: "What is Pastel?",
        answer: "Pastel is a journaling platform that lets you write memories and schedule them to be delivered to your future self, with thoughtful AI reflections when they arrive."
    },
    {
        question: "How does the future delivery work?",
        answer: "You write a memory and choose a future date for delivery. When that date arrives, we’ll send your memory back to you, along with AI-generated insights about your emotional journey."
    },
    {
        question: "Is my data private?",
        answer: "Yes. Your memories are private and securely stored. Only you can access them, and we never share your data."
    },
    {
        question: "Can I edit or delete a memory after writing it?",
        answer: "You can edit or delete your memories before their scheduled delivery date. After delivery, they become part of your personal archive."
    },
    {
        question: "Is Pastel free to use?",
        answer: "Pastel offers a free tier with core features. We may introduce premium features in the future."
    }
]

export const FAQ = () => {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null)

    const handleToggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx)
    }

    return (
        <section
            id="faq"
            className="container mx-auto px-2 sm:px-4 py-10 sm:py-16 md:py-24 text-center"
        >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4 sm:mb-6">
                Frequently Asked Questions
            </h2>
            <div className="w-full max-w-2xl mx-auto text-left">
                <div className="space-y-3 sm:space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="border border-[#e9dff5] dark:border-[#3a2d4f] rounded-xl bg-white dark:bg-[#2a1e3f] shadow-sm"
                        >
                            <button
                                className="w-full flex flex-wrap sm:flex-nowrap justify-between items-center px-5 sm:px-8 pt-2 sm:pt-4 pb-0 text-base sm:text-lg font-medium text-[#6b5c7c] dark:text-[#d8c5f0] focus:outline-none focus:ring-0 rounded-xl transition"
                                onClick={() => handleToggle(idx)}
                                aria-expanded={openIndex === idx}
                                aria-controls={`faq-panel-${idx}`}
                            >
                                <span className="text-left flex-1 pr-2">{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 ml-auto transition-transform duration-200 ${openIndex === idx ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                id={`faq-panel-${idx}`}
                                className={`px-5 sm:px-8 pb-3 sm:pb-4 text-[#8a7a9b] dark:text-[#a99bc1] text-sm sm:text-base transition-all duration-300 ease-in-out ${
                                    openIndex === idx
                                        ? "max-h-96 opacity-100"
                                        : "max-h-0 opacity-0 overflow-hidden"
                                }`}
                                aria-hidden={openIndex !== idx}
                            >
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}