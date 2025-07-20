"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { useParams } from "next/navigation"
import DashboardLayout from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Lock, Calendar, Clock, MessageSquare, ArrowLeft, Download, Share2, Delete, Trash } from "lucide-react"
import Link from "next/link"
import { LoadingSpinnerWithText } from "@/components/ui/loading-spinner"
import Image from "next/image"

interface Capsule {
    id: string
    title: string
    content: string
    deliveryDate: string
    status: string
    images: string[]
    createdAt: string
    deliveredAt?: string
    aiReflection?: string
}

export default function CapsulePage() {
    const [capsule, setCapsule] = useState<Capsule | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const { isLoaded, isSignedIn } = useUser()
    const params = useParams()
    const id = params.id as string

    useEffect(() => {
        if (isLoaded && isSignedIn && id) {
            fetchCapsule()
        } else if (isLoaded && !isSignedIn) {
            setLoading(false)
        }
    }, [isLoaded, isSignedIn, id])

    const fetchCapsule = async () => {
        try {
            setLoading(true)
            setError("")
            const response = await fetch(`/api/capsules/${id}`)
            
            if (!response.ok) {
                if (response.status === 404) {
                    setError("Capsule not found")
                }
                else if (response.status === 401) {
                    setError("Unauthorized Access")
                }
                else {
                    setError("Failed to fetch capsule")
                }
                return
            }
            
            const data = await response.json()
            setCapsule(data)
        } catch (err) {
            setError("Network error occurred")
        } finally {
            setLoading(false)
        }
    }

    const deleteCapsule = async () => {
        try {
            const response = await fetch(`/api/capsules/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                setError("Failed to delete capsule")
                return
            }

            const data = await response.json()
            console.log(data)
            window.location.href = "/dashboard/upcoming"
        } catch (err) {
            setError("Network error occurred")
        }
    }

    // Show loading state while Clerk loads
    if (!isLoaded) {
        return (
            <DashboardLayout>
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <LoadingSpinnerWithText
                            text="Loading your capsule..."
                            size="lg"
                        />
                    </div>
                </div>
            </DashboardLayout>
        )
    }

    // Show sign-in prompt if not authenticated
    if (!isSignedIn) {
        return (
            <DashboardLayout>
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
                                Sign In Required
                            </h2>
                            <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
                                Please sign in to view this capsule.
                            </p>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        )
    }

    // Show loading state while fetching data
    if (loading) {
        return (
            <DashboardLayout>
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <LoadingSpinnerWithText
                            text="Loading capsule..."
                            size="lg"
                        />
                    </div>
                </div>
            </DashboardLayout>
        )
    }

    // Show error state
    if (error || !capsule) {
        console.log(error)
        return (
            <DashboardLayout>
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
                                {error || "Capsule not found"}
                            </h2>
                            <p className="text-[#8a7a9b] dark:text-[#a99bc1] mb-4">
                                {error === "Capsule not found" 
                                    ? "The capsule you're looking for doesn't exist."
                                    : error === "Unauthorized Access"
                                        ? "Please sign in with correct account to view this capsule."
                                        : "Something went wrong while loading this capsule."
                                }
                            </p>
                            <Button
                                onClick={fetchCapsule}
                                variant="outline"
                                className="rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                            >
                                Try Again
                            </Button>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        )
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
                        href="/dashboard"
                        className="inline-flex items-center text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
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
                                onClick={() => deleteCapsule()}
                                variant="outline"
                                className="rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                            >
                                <Trash className="w-4 h-4" />
                            </Button>
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
                            
                            {/* Display images if any */}
                            {capsule.images && capsule.images.length > 0 && (
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {capsule.images.map((image: string, index: number) => (
                                        <div key={index} className="relative">
                                            <Image
                                                width={100}
                                                height={100}
                                                src={image}
                                                alt={`Capsule image ${index + 1}`}
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>

                {/* AI Reflection - Only show if capsule has been delivered and has AI reflection */}
                {!isLocked && capsule.deliveredAt && (
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
                                    {capsule.aiReflection || "AI reflection will be available once the capsule is delivered and processed."}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </DashboardLayout>
    )
}