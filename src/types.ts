export type DamageDimensions = {
  x: string
  y: string
  z?: string
}

export type Report = {
  title: string
  finalApprover: string
  acModel: string
  tailNumber: string
  reportId: string
  location: string
  additionalInspectionNotes?: string
  droneNumber: string
  inspectionDate: string
  timeLength: string
  reportNumber: string
  inspectorId: string
  rows: ReportRow[]
}

export type ReportRow = {
  stringerNumber: string
  damageType: string
  damageDimensions?: DamageDimensions
  inspector?: string
  notes?: string
}