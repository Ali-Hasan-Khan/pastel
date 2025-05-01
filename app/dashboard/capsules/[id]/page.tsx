"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Lock, Calendar, Clock, MessageSquare, ArrowLeft, Download, Share2 } from "lucide-react"
import Link from "next/link"

interface PageProps {
    // use promise
    params: Promise<{ id: string }>;
}

export default async function CapsulePage({ params }: PageProps) {
    // This would come from your API in a real app
    const resolvedParams = await params
    const capsule = {
        id: resolvedParams.id,
        title: "Letter to future me",
        content: `Dear Future Me,

I'm writing this on a quiet Sunday morning, thinking about where I want to be in a year. There's so much uncertainty right now, but also so much possibility.

I hope by the time you read this, some of those dreams we've been working on have started to take shape. Remember how nervous we were about taking that leap? I wonder if it paid off.

Keep growing, keep learning, and don't forget to take care of yourself.

With hope,
Past You`,
        createdAt: "2024-05-01",
        deliveryDate: "2025-05-01",
        status: "locked", // or "unlocked"
        aiReflection: "Your writing reveals a strong sense of hope and anticipation for the future, balanced with current uncertainties. There's a notable focus on personal growth and self-compassion.",
    }

    const isLocked = capsule.status === "locked"
    const currentDate = new Date()
    const deliveryDate = new Date(capsule.deliveryDate)
    const daysRemaining = Math.ceil((deliveryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <Link
                        href="/dashboard/capsules/history"
                        className="inline-flex items-center text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to History
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start justify-between"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
                                {capsule.title}
                            </h1>
                            <div className="flex items-center gap-4 text-[#8a7a9b] dark:text-[#a99bc1]">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Created {new Date(capsule.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>
                                        {isLocked
                                            ? `Opens in ${daysRemaining} days`
                                            : `Opened ${new Date(capsule.deliveryDate).toLocaleDateString()}`}
                                    </span>
                                </div>
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
                                variant="outline"
                                className="rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                            >
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-[#2a1e3f] rounded-2xl border border-[#e9dff5] dark:border-[#3a2d4f] overflow-hidden"
                >
                    {isLocked ? (
                        <div className="p-12 text-center">
                            <Lock className="w-16 h-16 text-[#c4a9db] dark:text-[#9f7fc0] mx-auto mb-4" />
                            <h2 className="text-2xl font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
                                This memory is still locked
                            </h2>
                            <p className="text-[#8a7a9b] dark:text-[#a99bc1] mb-6">
                                You can read this on {new Date(capsule.deliveryDate).toLocaleDateString()}
                            </p>
                            <Button
                                className="rounded-xl bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad]"
                            >
                                Notify me when it's ready
                            </Button>
                        </div>
                    ) : (
                        <div className="p-8">
                            <div className="prose dark:prose-invert max-w-none">
                                <div className="whitespace-pre-wrap text-[#6b5c7c] dark:text-[#d8c5f0]">
                                    {capsule.content}
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* AI Reflection */}
                {!isLocked && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#f9f5f2] dark:bg-[#251c36] rounded-xl p-6"
                    >
                        <div className="flex items-start gap-3">
                            <MessageSquare className="w-5 h-5 text-[#a2d8c0] dark:text-[#7ab5a0] mt-1" />
                            <div>
                                <h3 className="font-medium text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
                                    AI Reflection
                                </h3>
                                <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
                                    {capsule.aiReflection}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </DashboardLayout>
    )
}