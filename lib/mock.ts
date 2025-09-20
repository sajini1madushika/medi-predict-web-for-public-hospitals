import { DrugCatalogItem, Patient, PracticeCase, Prescription, VitalPoint } from './types'

export const patients: Patient[] = [
  {
    id: 'P-1001',
    name: 'Lakshmi Perera',
    age: 58,
    conditions: ['Diabetes', 'Hypertension'],
    risk: 'High',
    meds: ['Metformin 500mg bd', 'Amlodipine 5mg od']
  },
  {
    id: 'P-1002',
    name: 'Nimal Fernando',
    age: 49,
    conditions: ['Hypertension'],
    risk: 'Moderate',
    meds: ['Amlodipine 5mg od']
  },
  {
    id: 'P-1003',
    name: 'Sithara Jayasuriya',
    age: 35,
    conditions: ['Dyslipidemia'],
    risk: 'Low',
    meds: ['Atorvastatin 10mg od']
  }
]

export const rxQueue: Prescription[] = [
  {
    rxId: 'RX-2001',
    patientId: 'P-1001',
    patientName: 'Lakshmi Perera',
    items: [
      { drug: 'Metformin', doseMg: 500, frequencyPerDay: 2, durationDays: 30 },
      { drug: 'Amlodipine', doseMg: 5, frequencyPerDay: 1, durationDays: 30 }
    ],
    status: 'Pending'
  },
  {
    rxId: 'RX-2002',
    patientId: 'P-1002',
    patientName: 'Nimal Fernando',
    items: [
      { drug: 'Amlodipine', doseMg: 5, frequencyPerDay: 1, durationDays: 30 }
    ],
    status: 'Pending'
  }
]

export const drugCatalog: DrugCatalogItem[] = [
  { name: 'Metformin', minDoseMg: 500, maxDoseMg: 2000 },
  { name: 'Amlodipine', minDoseMg: 2.5, maxDoseMg: 10 },
  { name: 'Atorvastatin', minDoseMg: 10, maxDoseMg: 80 }
]

export const patientSeries: Record<string, VitalPoint[]> = {
  'P-1001': [
    { date: '2025-05-01', glucose: 160, systolic: 150, diastolic: 95, cholesterol: 220 },
    { date: '2025-06-01', glucose: 155, systolic: 148, diastolic: 92, cholesterol: 215 },
    { date: '2025-07-01', glucose: 150, systolic: 145, diastolic: 90, cholesterol: 210 },
    { date: '2025-08-01', glucose: 145, systolic: 142, diastolic: 88, cholesterol: 205 },
    { date: '2025-09-01', glucose: 140, systolic: 140, diastolic: 86, cholesterol: 200 }
  ],
  'P-1002': [
    { date: '2025-05-01', glucose: 110, systolic: 138, diastolic: 88, cholesterol: 190 },
    { date: '2025-06-01', glucose: 108, systolic: 136, diastolic: 86, cholesterol: 188 },
    { date: '2025-07-01', glucose: 106, systolic: 134, diastolic: 85, cholesterol: 186 },
    { date: '2025-08-01', glucose: 104, systolic: 132, diastolic: 84, cholesterol: 184 },
    { date: '2025-09-01', glucose: 102, systolic: 130, diastolic: 82, cholesterol: 182 }
  ],
  'P-1003': [
    { date: '2025-05-01', glucose: 95, systolic: 120, diastolic: 78, cholesterol: 210 },
    { date: '2025-06-01', glucose: 94, systolic: 118, diastolic: 76, cholesterol: 205 },
    { date: '2025-07-01', glucose: 93, systolic: 118, diastolic: 76, cholesterol: 200 },
    { date: '2025-08-01', glucose: 92, systolic: 116, diastolic: 75, cholesterol: 195 },
    { date: '2025-09-01', glucose: 92, systolic: 116, diastolic: 74, cholesterol: 190 }
  ]
}

export const mockCase: PracticeCase = {
  id: 'CASE-3001',
  title: 'Diabetes with Hypertension',
  summary:
    '58-year-old with T2DM and HTN. Fasting glucose 160 mg/dL, BP 150/95. Start metformin unless contraindicated; optimize BP.',
  hints: [
    'Metformin typical start 500 mg bd',
    'Amlodipine 5–10 mg od for BP',
    'Ensure duration and frequency provided',
    'Avoid exceeding max dose ranges'
  ]
}