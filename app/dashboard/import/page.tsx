"use client"


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Upload, File, Image as ImageIcon, FileText, X, Check, Clock } from "lucide-react"

export default function ImportPage() {
  const [isLocked, setIsLocked] = useState(true)
  return (
    
      <div className="max-w-4xl mx-auto space-y-8 relative">
        {isLocked && (
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute inset-0 m-8 flex items-center justify-center backdrop-blur-sm rounded-md bg-[#c4a9db]/50 z-0">
                <div className="flex text-center justify-center font-bold text-[#6b5c7c] dark:text-[#d8c5f0]">
                  <Clock className="w-5 h-5 mr-2" /> Work in Progress
                </div>
              </motion.div>
            )}
        <div>
          <h1 className="text-3xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
            Import Memories
          </h1>
          <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
            Upload old letters, photos, or journal entries to convert into time capsules.
          </p>
        </div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#2a1e3f] rounded-2xl border-2 border-dashed border-[#e9dff5] dark:border-[#3a2d4f] overflow-hidden"
        >
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-[#f0e8f7] dark:bg-[#3a2d4f] rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="w-8 h-8 text-[#c4a9db] dark:text-[#9f7fc0]" />
            </div>
            <h2 className="text-xl font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
              Drag and drop files here
            </h2>
            <p className="text-[#8a7a9b] dark:text-[#a99bc1] mb-6">
              or click to select files from your computer
            </p>
            <Button
              className="rounded-xl bg-[#c4a9db] hover:bg-[#b397d0] text-white dark:bg-[#9f7fc0] dark:hover:bg-[#8a6aad]"
            >
              Choose Files
            </Button>
          </div>
        </motion.div>

        {/* Import Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: File,
              title: "Letters & Documents",
              description: "Import .txt, .doc, .pdf files",
            },
            {
              icon: ImageIcon,
              title: "Photos & Images",
              description: "Import .jpg, .png, .gif files",
            },
            {
              icon: FileText,
              title: "Journal Entries",
              description: "Import from other apps",
            },
          ].map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-[#2a1e3f] rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f] p-6"
            >
              <option.icon className="w-8 h-8 text-[#c4a9db] dark:text-[#9f7fc0] mb-4" />
              <h3 className="font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
                {option.title}
              </h3>
              <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1]">
                {option.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Recent Imports */}
        <div>
          <h2 className="text-xl font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4">
            Recent Imports
          </h2>
          <div className="bg-white dark:bg-[#2a1e3f] rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f] divide-y divide-[#e9dff5] dark:divide-[#3a2d4f]">
            {[
              {
                name: "old-letters.pdf",
                status: "success",
                date: "2025-05-01",
              },
              {
                name: "journal-2024.docx",
                status: "processing",
                date: "2025-05-01",
              },
            ].map((file, index) => (
              <div key={file.name} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f9f5f2] dark:bg-[#251c36] rounded-lg flex items-center justify-center">
                    <File className="w-5 h-5 text-[#c4a9db] dark:text-[#9f7fc0]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#6b5c7c] dark:text-[#d8c5f0]">
                      {file.name}
                    </p>
                    <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1]">
                      {new Date(file.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                {file.status === "success" ? (
                  <div className="flex items-center text-[#a2d8c0] dark:text-[#7ab5a0] gap-1">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Imported</span>
                  </div>
                ) : (
                  <div className="flex items-center text-[#8a7a9b] dark:text-[#a99bc1] gap-1">
                    <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    <span className="text-sm">Processing</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    
  )
}