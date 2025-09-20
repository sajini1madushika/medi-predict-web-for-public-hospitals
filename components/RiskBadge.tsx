import { RiskLevel } from '@/lib/types'

const colorMap: Record<RiskLevel, string> = {
  Low: 'bg-green-500/20 text-green-300 border-green-400/30',
  Moderate: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
  High: 'bg-red-500/20 text-red-300 border-red-400/30'
}

export default function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${colorMap[level]}`}>
      {level}
    </span>
  )
}