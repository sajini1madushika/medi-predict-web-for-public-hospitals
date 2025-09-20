"use client"

import { useState } from 'react'
import { rxQueue as initialQueue } from '@/lib/mock'
import { Prescription } from '@/lib/types'

export default function PharmacistConsole() {
  const [queue, setQueue] = useState<Prescription[]>(initialQueue)

  const markDispensed = (rxId: string) => {
    setQueue(prev => prev.map(rx => rx.rxId === rxId ? { ...rx, status: 'Dispensed' } : rx))
  }

  return (
    <div className="card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-white/90">Prescription Queue</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-white/70">
            <tr>
              <th className="px-3 py-2">Rx ID</th>
              <th className="px-3 py-2">Patient</th>
              <th className="px-3 py-2">Items</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {queue.map(rx => (
              <tr key={rx.rxId} className="border-t border-white/10">
                <td className="px-3 py-2 font-mono">{rx.rxId}</td>
                <td className="px-3 py-2">{rx.patientName}</td>
                <td className="px-3 py-2">
                  <ul className="list-disc pl-5 text-white/80">
                    {rx.items.map((it, idx) => (
                      <li key={idx}>{it.drug} {it.doseMg}mg x{it.frequencyPerDay}/day × {it.durationDays}d</li>
                    ))}
                  </ul>
                </td>
                <td className="px-3 py-2">{rx.status}</td>
                <td className="px-3 py-2 text-right">
                  {rx.status === 'Pending' && (
                    <button className="btn" onClick={() => markDispensed(rx.rxId)}>Mark Dispensed</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}