import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-[#e9dff5] dark:border-[#3a2d4f] border-t-[#c4a9db] dark:border-t-[#9f7fc0] rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

export function LoadingSpinnerWithText({ 
  text = "Loading...", 
  size = "md",
  className = "" 
}: LoadingSpinnerProps & { text?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <LoadingSpinner size={size} />
      <p className="text-[#8a7a9b] dark:text-[#a99bc1] text-sm animate-pulse">
        {text}
      </p>
    </div>
  )
} 