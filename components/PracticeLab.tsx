"use client"

import { useMemo, useState } from 'react'
import { drugCatalog, mockCase } from '@/lib/mock'

type DraftItem = {
  drug: string
  doseMg: number | ''
  frequencyPerDay: number | ''
  durationDays: number | ''
}

export default function PracticeLab() {
  const [items, setItems] = useState<DraftItem[]>([
    { drug: 'Metformin', doseMg: 500, frequencyPerDay: 2, durationDays: 30 }
  ])

  const addItem = () => setItems(prev => [...prev, { drug: 'Amlodipine', doseMg: 5, frequencyPerDay: 1, durationDays: 30 }])
  const update = (idx: number, field: keyof DraftItem, value: string) => {
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: field === 'drug' ? value : (value === '' ? '' : Number(value)) } : it))
  }
  const remove = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx))

  const feedback = useMemo(() => {
    const notes: string[] = []
    items.forEach((it, i) => {
      if (!it.drug) notes.push(`Item ${i + 1}: Missing drug`)
      if (it.doseMg === '' || it.frequencyPerDay === '' || it.durationDays === '') {
        notes.push(`Item ${i + 1}: Incomplete fields`)
      }
      const cat = drugCatalog.find(d => d.name === it.drug)
      if (cat && typeof it.doseMg === 'number') {
        if (it.doseMg < cat.minDoseMg) notes.push(`${it.drug}: Dose below min (${cat.minDoseMg}mg)`) 
        if (it.doseMg > cat.maxDoseMg) notes.push(`${it.drug}: Dose exceeds max (${cat.maxDoseMg}mg)`) 
      }
    })
    if (!items.length) notes.push('Add at least one medication')
    // Simple suggestion
    const hasDiabetesMed = items.some(it => it.drug === 'Metformin')
    const hasHtnMed = items.some(it => it.drug === 'Amlodipine')
    if (!hasDiabetesMed) notes.push('Suggestion: Add Metformin for diabetes management if not contraindicated')
    if (!hasHtnMed) notes.push('Suggestion: Add Amlodipine to optimize blood pressure')
    return notes
  }, [items])

  return (
    <div className="space-y-4">
      <div className="card p-4">
        <h3 className="mb-1 text-base font-semibold text-white/90">{mockCase.title}</h3>
        <p className="text-white/80">{mockCase.summary}</p>
        <ul className="mt-2 list-disc pl-5 text-white/70">
          {mockCase.hints.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      </div>

      <div className="card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-white/90">Draft Prescription</h3>
          <button className="btn" onClick={addItem}>Add Item</button>
        </div>
        <div className="space-y-3">
          {items.map((it, idx) => (
            <div key={idx} className="grid grid-cols-1 gap-2 md:grid-cols-5">
              <select className="rounded-md border border-white/10 bg-white/10 p-2 text-white md:col-span-2" value={it.drug} onChange={e => update(idx, 'drug', e.target.value)}>
                {drugCatalog.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
              <input className="rounded-md border border-white/10 bg-white/10 p-2 text-white" type="number" placeholder="Dose (mg)" value={it.doseMg} onChange={e => update(idx, 'doseMg', e.target.value)} />
              <input className="rounded-md border border-white/10 bg-white/10 p-2 text-white" type="number" placeholder="Freq/day" value={it.frequencyPerDay} onChange={e => update(idx, 'frequencyPerDay', e.target.value)} />
              <div className="flex gap-2">
                <input className="w-full rounded-md border border-white/10 bg-white/10 p-2 text-white" type="number" placeholder="Days" value={it.durationDays} onChange={e => update(idx, 'durationDays', e.target.value)} />
                <button className="btn" onClick={() => remove(idx)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4">
        <h3 className="mb-2 text-base font-semibold text-white/90">Rule-based Feedback</h3>
        {feedback.length ? (
          <ul className="list-disc pl-5 text-amber-200">
            {feedback.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        ) : (
          <p className="text-emerald-200">Looks good!</p>
        )}
      </div>
    </div>
  )
}