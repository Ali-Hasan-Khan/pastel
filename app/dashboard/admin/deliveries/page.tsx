'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

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
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-100 rounded">
            <h3 className="font-semibold">Pending</h3>
            <p className="text-2xl">{stats.pending}</p>
          </div>
          <div className="p-4 bg-green-100 rounded">
            <h3 className="font-semibold">Delivered</h3>
            <p className="text-2xl">{stats.delivered}</p>
          </div>
          <div className="p-4 bg-red-100 rounded">
            <h3 className="font-semibold">Failed</h3>
            <p className="text-2xl">{stats.failed}</p>
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