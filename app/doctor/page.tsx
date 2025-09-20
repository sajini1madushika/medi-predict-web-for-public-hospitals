import Card from '@/components/Card'
import RiskBadge from '@/components/RiskBadge'
import { patients } from '@/lib/mock'

export default function DoctorDashboard() {
  const total = patients.length
  const high = patients.filter(p => p.risk === 'High').length
  const moderate = patients.filter(p => p.risk === 'Moderate').length
  const low = patients.filter(p => p.risk === 'Low').length

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card>
          <div className="text-white/70 text-sm">Total Patients</div>
          <div className="text-2xl font-semibold">{total}</div>
        </Card>
        <Card>
          <div className="text-white/70 text-sm">High Risk</div>
          <div className="text-2xl font-semibold">{high}</div>
        </Card>
        <Card>
          <div className="text-white/70 text-sm">Moderate / Low</div>
          <div className="text-2xl font-semibold">{moderate} / {low}</div>
        </Card>
      </div>

      <Card title="Patients">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-white/70">
              <tr>
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Age</th>
                <th className="px-3 py-2">Conditions</th>
                <th className="px-3 py-2">Risk</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id} className="border-t border-white/10">
                  <td className="px-3 py-2"><a className="text-blue-300 underline" href={`/doctor/${p.id}`}>{p.id}</a></td>
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2">{p.age}</td>
                  <td className="px-3 py-2">{p.conditions.join(', ')}</td>
                  <td className="px-3 py-2"><RiskBadge level={p.risk} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}