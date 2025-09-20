import Card from '@/components/Card'
import TrendsChart from '@/components/TrendsChart'
import { notFound } from 'next/navigation'
import { patientSeries, patients } from '@/lib/mock'

type Params = { params: { id: string } }

export default function PatientDetail({ params }: Params) {
  const patient = patients.find(p => p.id === params.id)
  if (!patient) return notFound()
  const series = patientSeries[patient.id]

  return (
    <div className="space-y-4">
      <Card title={`${patient.name} (${patient.id})`}>
        <div className="text-white/80">Age {patient.age} • {patient.conditions.join(', ')}</div>
      </Card>
      <Card title="Vitals Trends">
        <TrendsChart data={series} />
      </Card>
      <Card title="Medications">
        <ul className="list-disc pl-5 text-white/80">
          {patient.meds.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </Card>
    </div>
  )
}

export async function generateStaticParams() {
  return patients.map(p => ({ id: p.id }))
}