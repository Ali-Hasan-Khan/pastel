'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface DeliveryStats {
  pending: number
  delivered: number
  failed: number
  recentLogs: any[]
}

export default function DeliveryAdminPage() {
  const [stats, setStats] = useState<DeliveryStats | null>(null)
  const [isTriggering, setIsTriggering] = useState(false)


  const triggerDelivery = async (action: 'deliver' | 'retry') => {
    setIsTriggering(true)
    try {
      const response = await fetch('/api/admin/trigger-delivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error('Unauthorized access')
      }
      
      alert(`${action} completed: ${result.message}`)
      // Refresh stats
      fetchStats()
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
    setIsTriggering(false)
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/delivery-stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch delivery stats:', error)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Delivery Management</h1>
      
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-[#2e3657] dark:to-[#1e2233] shadow p-6 flex flex-col items-center">
            <span className="text-blue-600 dark:text-blue-300 text-4xl font-bold mb-2">{stats.pending}</span>
            <span className="text-sm font-medium text-[#6b5c7c] dark:text-[#d8c5f0]">Pending</span>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-[#2d4f3a] dark:to-[#1e3322] shadow p-6 flex flex-col items-center">
            <span className="text-green-600 dark:text-green-300 text-4xl font-bold mb-2">{stats.delivered}</span>
            <span className="text-sm font-medium text-[#6b5c7c] dark:text-[#d8c5f0]">Delivered</span>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-red-50 to-red-100 dark:from-[#4f2d2d] dark:to-[#331e1e] shadow p-6 flex flex-col items-center">
            <span className="text-red-600 dark:text-red-300 text-4xl font-bold mb-2">{stats.failed}</span>
            <span className="text-sm font-medium text-[#6b5c7c] dark:text-[#d8c5f0]">Failed</span>
          </div>
        </div>
      )}

      <div className="space-x-4 mb-6">
        <Button 
          onClick={() => triggerDelivery('deliver')}
          disabled={isTriggering}
        >
          {isTriggering ? 'Processing...' : 'Trigger Delivery'}
        </Button>
        <Button 
          onClick={() => triggerDelivery('retry')}
          disabled={isTriggering}
          variant="outline"
        >
          Retry Failed
        </Button>
      </div>
    </div>
  )
} 