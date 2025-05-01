"use client"

import DashboardLayout from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MailOpen, Calendar, MessageSquare, Download } from "lucide-react"
import Link from "next/link"

export default function HistoryPage() {
    // This would come from your API in a real app
    const pastCapsules = [
        {
            id: "1",
            title: "Reflections on 2024",
            content: "Looking back at the year that was...",
            deliveryDate: "2025-01-01",
            openedDate: "2025-01-01",
            aiReflection: "Your writing shows significant personal growth...",
        },
        {
            id: "2",
            title: "Pre-graduation thoughts",
            content: "My hopes and fears before graduating...",
            deliveryDate: "2024-12-15",
            openedDate: "2024-12-15",
            aiReflection: "There's a strong sense of anticipation...",
        },
    ]

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
                        Memory Archive
                    </h1>
                    <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
                        Revisit your past reflections and memories.
                    </p>
                </div>

                <div className="grid gap-6">
                    {pastCapsules.map((capsule, index) => (
                        <motion.div
                            key={capsule.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-[#2a1e3f] rounded-2xl border border-[#e9dff5] dark:border-[#3a2d4f] overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <MailOpen className="w-5 h-5 text-[#c4a9db] dark:text-[#9f7fc0]" />
                                    <h2 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0]">
                                        {capsule.title}
                                    </h2>
                                </div>

                                <p className="text-[#8a7a9b] dark:text-[#a99bc1] mb-6">
                                    {capsule.content}
                                </p>

                                <div className="bg-[#f9f5f2] dark:bg-[#251c36] rounded-xl p-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <MessageSquare className="w-5 h-5 text-[#a2d8c0] dark:text-[#7ab5a0] mt-1" />
                                        <div>
                                            <h3 className="font-medium text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
                                                AI Reflection
                                            </h3>
                                            <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1]">
                                                {capsule.aiReflection}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm text-[#8a7a9b] dark:text-[#a99bc1]">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>Opened {new Date(capsule.openedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                                        >
                                            <Download className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            className="rounded-xl bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad]"
                                        >
                                            Read Full Memory
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center text-[#8a7a9b] dark:text-[#a99bc1]">
                    <p>Looking for older memories?</p>
                    <Link href="/dashboard/archive">
                        <Button
                            variant="link"
                            className="text-[#c4a9db] hover:text-[#b397d0] dark:text-[#9f7fc0] dark:hover:text-[#8a6aad]"
                        >
                            Browse the complete archive
                        </Button>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    )
}