"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon, X, Upload } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface UploadedImage {
  url: string
  filename: string
  originalName: string
  size: number
  type: string
}

interface ImageUploadProps {
  images: UploadedImage[]
  onImagesChange: (images: UploadedImage[]) => void
  maxImages?: number
  disabled?: boolean
}

export function ImageUpload({ 
  images, 
  onImagesChange, 
  maxImages = 5,
  disabled = false 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    // Check if adding these files would exceed the limit
    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`)
      return
    }

    setUploading(true)
    setError("")

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()
        if (!result.success) {
          throw new Error(result.error)
        }

        return result.data
      })

      const uploadedImages = await Promise.all(uploadPromises)
      onImagesChange([...images, ...uploadedImages])
    } catch (err: any) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || uploading || images.length >= maxImages}
        >
          {uploading ? (
            <Upload className="w-5 h-5 animate-spin" />
          ) : (
            <ImageIcon className="w-5 h-5" />
          )}
          {uploading ? 'Uploading...' : 'Add Images'}
        </Button>
        
        <span className="text-xs text-[#8a7a9b] dark:text-[#a99bc1]">
          {images.length}/{maxImages} images
        </span>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Error Message */}
      {error && (
        <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2">
          {error}
        </div>
      )}

      {/* Image Preview Grid */}
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {images.map((image, index) => (
              <motion.div
                key={image.filename}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group"
              >
                <div className="aspect-square rounded-lg overflow-hidden border border-[#e9dff5] dark:border-[#3a2d4f] bg-[#f9f5f2] dark:bg-[#251c36]">
                  <img
                    src={image.url}
                    alt={image.originalName}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    type="button"
                  >
                    <X className="w-3 h-3" />
                  </button>

                  {/* Image Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="truncate">{image.originalName}</div>
                    <div>{formatFileSize(image.size)}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 