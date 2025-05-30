"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import DashboardLayout from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/ui/image-upload"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Smile, Send, X, CheckCircle, Clock, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

interface UploadedImage {
  url: string
  filename: string
  originalName: string
  size: number
  type: string
}

interface SuccessData {
  title: string
  deliveryDate: string
  capsuleId: string
}

export default function ComposePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [deliveryTime, setDeliveryTime] = useState("1 month")
  const [customDate, setCustomDate] = useState("")
  const [showCustomDate, setShowCustomDate] = useState(false)
  const [images, setImages] = useState<UploadedImage[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successData, setSuccessData] = useState<SuccessData | null>(null)
  const [error, setError] = useState("")
  
  // Get the current user from Clerk
  const { isLoaded, isSignedIn, user } = useUser()

  // Helper to calculate delivery date based on deliveryTime or custom date
  function calculateDeliveryDate() {
    if (showCustomDate && customDate) {
      // Use custom date
      const selectedDate = new Date(customDate)
      selectedDate.setHours(12, 0, 0, 0) // Set to noon to avoid timezone issues
      return selectedDate.toISOString()
    }
    
    // Use preset delivery time
    const now = new Date()
    switch (deliveryTime) {
      case "1 week":
        now.setDate(now.getDate() + 7)
        break
      case "1 month":
        now.setMonth(now.getMonth() + 1)
        break
      case "3 months":
        now.setMonth(now.getMonth() + 3)
        break
      case "6 months":
        now.setMonth(now.getMonth() + 6)
        break
      case "1 year":
        now.setFullYear(now.getFullYear() + 1)
        break
      default:
        break
    }
    return now.toISOString()
  }

  const handleCustomDateToggle = () => {
    setShowCustomDate(!showCustomDate)
    if (showCustomDate) {
      setCustomDate("")
    }
  }

  const validateCustomDate = (date: string) => {
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate <= today) {
      setError("Delivery date must be in the future")
      return false
    }
    
    // Check if date is too far in the future (optional - 10 years max)
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 10)
    
    if (selectedDate > maxDate) {
      setError("Delivery date cannot be more than 10 years in the future")
      return false
    }
    
    return true
  }

  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
    setCustomDate(date)
    setError("") // Clear any previous errors
    
    if (date && !validateCustomDate(date)) {
      return
    }
  }

  const handleImagesChange = (newImages: UploadedImage[]) => {
    setImages(newImages)
  }

  const calculateDaysUntilDelivery = (deliveryDate: string) => {
    const now = new Date()
    const delivery = new Date(deliveryDate)
    const diffTime = delivery.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError("")
    
    // Check if user is authenticated and loaded
    if (!isLoaded || !isSignedIn || !user) {
      setError("You must be signed in to create a capsule.")
      setLoading(false)
      return
    }

    // Validate custom date if selected
    if (showCustomDate) {
      if (!customDate) {
        setError("Please select a custom delivery date")
        setLoading(false)
        return
      }
      if (!validateCustomDate(customDate)) {
        setLoading(false)
        return
      }
    }
    
    const deliveryDate = calculateDeliveryDate()
    const userId = user.id
    
    try {
      const res = await fetch("/api/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          deliveryDate,
          userId,
          status: "scheduled",
          images: images.map(img => img.url), // Send only the URLs
        }),
      })
      const result = await res.json()
      if (res.ok) {
        setSuccess(true)
        setSuccessData({
          title,
          deliveryDate,
          capsuleId: result.data.id
        })
        // Don't reset form immediately - let user see success state
      } else {
        setError(result.error || "Failed to create capsule.")
      }
    } catch (err) {
      setError("Network error.")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setTitle("")
    setContent("")
    setCustomDate("")
    setShowCustomDate(false)
    setDeliveryTime("1 month")
    setImages([])
    setSuccess(false)
    setSuccessData(null)
    setError("")
  }

  // Show loading state while Clerk loads
  if (!isLoaded) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-[#8a7a9b] dark:text-[#a99bc1]">Loading...</div>
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
                Please sign in to create time capsules.
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Get minimum date (tomorrow)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  // Get maximum date (10 years from now)
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 10)
  const maxDateString = maxDate.toISOString().split('T')[0]

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Success Modal Overlay */}
        <AnimatePresence>
          {success && successData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm m-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.target === e.currentTarget && setSuccess(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white dark:bg-[#2a1e3f] rounded-3xl p-8 max-w-md w-full mx-4 relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f0e8f7] to-[#e9f5f0] dark:from-[#3a2d4f] dark:to-[#2d3f35] opacity-50"></div>
                
                {/* Floating sparkles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0], 
                        scale: [0, 1, 0],
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50]
                      }}
                      transition={{ 
                        duration: 2, 
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-[#c4a9db] dark:text-[#9f7fc0]" />
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10">
                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="flex justify-center mb-6"
                  >
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#c4a9db] to-[#a2d8c0] dark:from-[#9f7fc0] dark:to-[#7ab5a0] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="absolute inset-0 border-4 border-[#c4a9db] dark:border-[#9f7fc0] rounded-full opacity-30"
                      ></motion.div>
                    </div>
                  </motion.div>

                  {/* Success Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-6"
                  >
                    <h2 className="text-2xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
                      Time Capsule Created! 🎉
                    </h2>
                    <p className="text-[#8a7a9b] dark:text-[#a99bc1] mb-4">
                      Your memory has been safely stored and will be delivered on
                    </p>
                    <div className="bg-[#f0e8f7] dark:bg-[#3a2d4f] rounded-xl p-4 mb-4">
                      <h3 className="font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-1">
                        "{successData.title}"
                      </h3>
                      <div className="flex items-center justify-center gap-2 text-sm text-[#8a7a9b] dark:text-[#a99bc1]">
                        <Clock className="w-4 h-4" />
                        <span>
                          {new Date(successData.deliveryDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-[#a2d8c0] dark:text-[#7ab5a0] mt-2">
                        {calculateDaysUntilDelivery(successData.deliveryDate)} days from now
                      </p>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                  >
                    <Link href="/dashboard/upcoming" className="block">
                      <Button className="w-full bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] rounded-xl">
                        View All Capsules
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={resetForm}
                        className="flex-1 rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                      >
                        Create Another
                      </Button>
                      <Link href="/dashboard" className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                        >
                          Dashboard
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setSuccess(false)}
                  className="absolute top-4 right-4 text-[#8a7a9b] hover:text-[#6b5c7c] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] z-20"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <h1 className="text-3xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
            Create New Time Capsule
          </h1>
          <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
            Write something for your future self to discover.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#2a1e3f] rounded-2xl border border-[#e9dff5] dark:border-[#3a2d4f] overflow-hidden"
          onSubmit={handleSubmit}
        >
          <div className="p-6 md:p-8 bg-linear-to-r from-[#f0e8f7] to-[#e9f5f0] dark:from-[#3a2d4f] dark:to-[#2d3f35]">
            <input
              type="text"
              placeholder="Title your memory..."
              className="w-full bg-transparent border-none text-xl font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] placeholder:text-[#8a7a9b] dark:placeholder:text-[#a99bc1] focus:outline-none focus:ring-0"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <Textarea
              placeholder="Dear future me..."
              className="min-h-[300px] text-lg p-4 rounded-xl border-[#e9dff5] focus:border-[#c4a9db] focus:ring-[#c4a9db] dark:border-[#3a2d4f] dark:bg-[#251c36] dark:text-[#d8c5f0] dark:placeholder:text-[#8a7a9b] dark:focus:border-[#9f7fc0] dark:focus:ring-[#9f7fc0] resize-none"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
            />

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-[#8a7a9b] dark:text-[#a99bc1] mb-3">
                Add Images to Your Memory
              </label>
              <ImageUpload 
                images={images}
                onImagesChange={handleImagesChange}
                disabled={loading}
                maxImages={5}
              />
            </div>

            <div className="space-y-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-[#8a7a9b] dark:text-[#a99bc1] mb-2">
                  When should this be delivered?
                </label>
                
                {!showCustomDate ? (
                  <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                    <SelectTrigger className="w-full rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] dark:bg-[#251c36] dark:text-[#d8c5f0]">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#251c36] dark:border-[#3a2d4f]">
                      <SelectItem value="1 week">1 week</SelectItem>
                      <SelectItem value="1 month">1 month</SelectItem>
                      <SelectItem value="3 months">3 months</SelectItem>
                      <SelectItem value="6 months">6 months</SelectItem>
                      <SelectItem value="1 year">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={customDate}
                      onChange={handleCustomDateChange}
                      min={minDate}
                      max={maxDateString}
                      className="flex-1 rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f] dark:bg-[#251c36] dark:text-[#d8c5f0] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c4a9db] dark:focus:ring-[#9f7fc0]"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCustomDateToggle}
                      className="rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className={`rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f] ${
                    showCustomDate ? 'bg-[#f0e8f7] text-[#6b5c7c] dark:bg-[#3a2d4f] dark:text-[#d8c5f0]' : ''
                  }`}
                  type="button"
                  onClick={handleCustomDateToggle}
                >
                  <Calendar className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                  type="button"
                >
                  <Smile className="w-5 h-5" />
                </Button>
              </div>

              {showCustomDate && customDate && (
                <div className="text-sm text-[#6b5c7c] dark:text-[#d8c5f0] bg-[#f0e8f7] dark:bg-[#3a2d4f] rounded-lg p-3">
                  <p>
                    <span className="font-medium">Delivery date:</span>{" "}
                    {new Date(customDate).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-xs text-[#8a7a9b] dark:text-[#a99bc1] mt-1">
                    Your capsule will be delivered at noon on this date.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                size="lg"
                className="rounded-xl bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad] px-8 relative overflow-hidden"
                type="submit"
                disabled={loading}
              >
                {loading && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
                {loading ? 'Scheduling...' : 'Schedule Delivery'}
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400"
              >
                {error}
              </motion.div>
            )}
          </div>
        </motion.form>

        <div className="bg-[#f9f5f2] dark:bg-[#251c36] rounded-xl p-4 text-[#8a7a9b] dark:text-[#a99bc1] text-sm">
          <p>
            <span className="font-medium">Privacy note:</span> Your memories are encrypted and only accessible to you.
            Learn more about our{" "}
            <span className="text-[#c4a9db] dark:text-[#9f7fc0] hover:underline cursor-pointer">
              privacy policy
            </span>
            .
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}