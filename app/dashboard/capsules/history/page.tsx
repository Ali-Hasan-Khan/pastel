"use client"

import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { MailOpen, Calendar, MessageSquare, Download } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { LoadingSpinnerWithText } from "@/components/ui/loading-spinner"
import { useRouter } from "next/navigation"

interface Capsule {
    id: string
    title: string
    content: string
    deliveryDate: string
    openedDate: string
    aiReflection: string
}

export default function HistoryPage() {
    // This would come from your API in a real app
    const [pastCapsules, setPastCapsules] = useState<Capsule[]>([])
    const [loading, setLoading] = useState(true)
    const { isLoaded, isSignedIn } = useUser()
    const router = useRouter()
    useEffect(() => {
        if (isLoaded && isSignedIn) {
            fetchCapsules()
        } else if (isLoaded && !isSignedIn) {
            setLoading(false)
        }
    }, [isLoaded, isSignedIn])
    
    const fetchCapsules = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/capsules/delivered')
            const data = await response.json()

            setPastCapsules(data)
        } catch (error) {
            console.error('Error fetching capsules:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <LoadingSpinnerWithText
                            text="Loading your past capsules..."
                            size="lg"
                        />
                    </div>
                </div>
            
        )
    }

    return (
        
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
                    {pastCapsules.length > 0 && pastCapsules.map((capsule, index) => (
                        <motion.div
                            key={capsule.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-[#2a1e3f] rounded-2xl border border-[#e9dff5] dark:border-[#3a2d4f] overflow-hidden"
                        >
                            <div className="p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                                    <MailOpen className="w-5 h-5 text-[#c4a9db] dark:text-[#9f7fc0]" />
                                    <h2 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] break-words">
                                        {capsule.title}
                                    </h2>
                                </div>

                                <p className="text-[#8a7a9b] dark:text-[#a99bc1] mb-6 break-words">
                                    {capsule.content}
                                </p>

                                <div className="bg-[#f9f5f2] dark:bg-[#251c36] rounded-xl p-3 sm:p-4 mb-6">
                                    <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
                                        <MessageSquare className="w-5 h-5 text-[#a2d8c0] dark:text-[#7ab5a0] mt-1" />
                                        <div>
                                            <h3 className="font-medium text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
                                                AI Reflection
                                            </h3>
                                            <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1] break-words">
                                                {capsule.aiReflection}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 text-sm text-[#8a7a9b] dark:text-[#a99bc1] mb-2 sm:mb-0">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            Opened {new Date(capsule.openedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="flex flex-row sm:flex-row gap-2 w-full sm:w-auto">
                                        <Button
                                            variant="outline"
                                            className="rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f] w-full sm:w-auto"
                                        >
                                            <Download className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            onClick={() => router.push(`/dashboard/capsules/${capsule.id}`)}
                                            className="rounded-xl bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] w-full sm:w-auto"
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
        
    )
}