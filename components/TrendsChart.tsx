"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { VitalPoint } from '@/lib/types'

type Props = { data: VitalPoint[] }

export default function TrendsChart({ data }: Props) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <XAxis dataKey="date" stroke="#96a0c6" tick={{ fontSize: 12 }} />
          <YAxis stroke="#96a0c6" tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ background: '#0b1020', border: '1px solid rgba(255,255,255,0.1)' }} />
          <Legend />
          <Line type="monotone" dataKey="glucose" stroke="#60a5fa" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="systolic" stroke="#34d399" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="cholesterol" stroke="#f59e0b" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}