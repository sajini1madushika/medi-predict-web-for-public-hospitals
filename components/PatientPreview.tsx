"use client"

import { useMemo, useState } from 'react'
import Card from './Card'
import TrendsChart from './TrendsChart'
import { patientSeries, patients } from '@/lib/mock'

const en = {
  vitals: 'Vitals Trends',
  plan: 'Treatment Plan',
  language: 'Language',
  english: 'English',
  sinhala: 'Sinhala'
}

const si = {
  vitals: 'ජීව දර්ශක ප්‍රවණතා',
  plan: 'ප්රතිකාර සැලැස්ම',
  language: 'භාෂාව',
  english: 'ඉංග්‍රීසි',
  sinhala: 'සිංහල'
}

type LangKey = 'en' | 'si'

export default function PatientPreview() {
  const [lang, setLang] = useState<LangKey>('en')
  const t = lang === 'en' ? en : si
  const patient = patients[0]
  const series = useMemo(() => patientSeries[patient.id], [patient.id])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <label className="text-white/70 text-sm">{t.language}:</label>
        <select className="rounded-md border border-white/10 bg-white/10 p-2 text-white" value={lang} onChange={e => setLang(e.target.value as LangKey)}>
          <option value="en">{t.english}</option>
          <option value="si">{t.sinhala}</option>
        </select>
      </div>

      <Card title={`${patient.name} (${patient.id})`}>
        <div className="text-white/80">Age {patient.age} • {patient.conditions.join(', ')}</div>
      </Card>

      <Card title={t.vitals}>
        <TrendsChart data={series} />
      </Card>

      <Card title={t.plan}>
        <ul className="list-disc pl-5 text-white/80">
          {patient.meds.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </Card>
    </div>
  )
}