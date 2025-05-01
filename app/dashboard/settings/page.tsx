"use client"

import DashboardLayout from "@/components/dashboard/layout"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Bell, Mail, Palette, Lock, Shield, Download, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const sections = [
    {
      title: "Notification Preferences",
      icon: Bell,
      description: "Choose when and how you want to be notified about your memories.",
      settings: [
        {
          label: "Email Notifications",
          description: "Receive an email when your time capsule is ready.",
          type: "toggle",
          defaultValue: true,
        },
        {
          label: "Notification Frequency",
          description: "How often you want to be reminded about upcoming capsules.",
          type: "select",
          options: ["Daily", "Weekly", "Monthly"],
          defaultValue: "Weekly",
        },
      ],
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      description: "Manage your data and privacy settings.",
      settings: [
        {
          label: "End-to-End Encryption",
          description: "Enable enhanced security for your memories.",
          type: "toggle",
          defaultValue: true,
        },
        {
          label: "Data Retention",
          description: "Choose how long to keep opened memories.",
          type: "select",
          options: ["Forever", "1 Year", "5 Years"],
          defaultValue: "Forever",
        },
      ],
    },
  ]

  const dangerZone = [
    {
      label: "Export All Data",
      description: "Download all your memories and account data.",
      icon: Download,
      buttonText: "Export",
      buttonVariant: "outline" as const,
    },
    {
      label: "Delete Account",
      description: "Permanently delete your account and all data.",
      icon: Trash2,
      buttonText: "Delete",
      buttonVariant: "destructive" as const,
    },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-bold text-[#6b5c7c] dark:text-[#d8c5f0] mb-2">
            Settings
          </h1>
          <p className="text-[#8a7a9b] dark:text-[#a99bc1]">
            Manage your account preferences and notifications.
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-[#2a1e3f] rounded-xl border border-[#e9dff5] dark:border-[#3a2d4f] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <section.icon className="w-5 h-5 text-[#c4a9db] dark:text-[#9f7fc0]" />
                  <h2 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0]">
                    {section.title}
                  </h2>
                </div>
                <p className="text-[#8a7a9b] dark:text-[#a99bc1] mb-6">
                  {section.description}
                </p>

                <div className="space-y-6">
                  {section.settings.map((setting) => (
                    <div key={setting.label} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#6b5c7c] dark:text-[#d8c5f0]">
                          {setting.label}
                        </h3>
                        <p className="text-sm text-[#8a7a9b] dark:text-[#a99bc1]">
                          {setting.description}
                        </p>
                      </div>
                      {setting.type === "toggle" ? (
                        <Button
                          variant="outline"
                          className="rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] text-[#8a7a9b] hover:text-[#6b5c7c] hover:bg-[#f0e8f7] dark:text-[#a99bc1] dark:hover:text-[#d8c5f0] dark:hover:bg-[#3a2d4f]"
                        >
                          Enabled
                        </Button>
                      ) : (
                        <Select defaultValue={setting.defaultValue as string}>
                          <SelectTrigger className="w-[140px] rounded-xl border-[#e9dff5] dark:border-[#3a2d4f] dark:bg-[#251c36] dark:text-[#d8c5f0]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-[#251c36] dark:border-[#3a2d4f]">
                            {setting.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Danger Zone */}
        <div>
          <h2 className="text-lg font-semibold text-[#6b5c7c] dark:text-[#d8c5f0] mb-4">
            Danger Zone
          </h2>
          <div className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20 overflow-hidden">
            <div className="p-6 space-y-6">
              {dangerZone.map((action) => (
                <div key={action.label} className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <action.icon className="w-5 h-5 text-red-500 dark:text-red-400 mt-1" />
                    <div>
                      <h3 className="font-medium text-red-700 dark:text-red-300">
                        {action.label}
                      </h3>
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={action.buttonVariant}
                    className={
                      action.buttonVariant === "destructive"
                        ? "rounded-xl bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700"
                        : "rounded-xl border-black dark:border-red-300 text-black hover:bg-[#f0e8f7] dark:text-red-300 dark:hover:bg-red-900/20 transition-colors"
                    }
                  >
                    {action.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}