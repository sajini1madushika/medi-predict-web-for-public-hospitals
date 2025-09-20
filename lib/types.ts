export type RiskLevel = 'Low' | 'Moderate' | 'High'

export interface Patient {
  id: string
  name: string
  age: number
  conditions: string[]
  risk: RiskLevel
  meds: string[]
}

export interface Prescription {
  rxId: string
  patientId: string
  patientName: string
  items: Array<{
    drug: string
    doseMg: number
    frequencyPerDay: number
    durationDays: number
  }>
  status: 'Pending' | 'Dispensed'
}

export interface DrugCatalogItem {
  name: string
  minDoseMg: number
  maxDoseMg: number
}

export interface VitalPoint {
  date: string
  glucose: number
  systolic: number
  diastolic: number
  cholesterol: number
}

export interface PracticeCase {
  id: string
  title: string
  summary: string
  hints: string[]
}