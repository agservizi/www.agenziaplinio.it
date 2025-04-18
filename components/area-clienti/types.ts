// Definizione dei tipi utilizzati nell'area clienti
export interface Appointment {
  id: number | string
  service?: string
  bookingDate: string
  bookingTime: string
  status: string
}

export interface Shipment {
  id: string
  trackingNumber: string
  destination: string
  date: string
  status: string
  courier?: string
}

export interface Document {
  id: string
  name: string
  date: string
  type: string
  category?: string
  size?: string
}

export interface Bill {
  id: string
  service: string
  amount: number
  dueDate: string
  paid: boolean
  pdfUrl?: string
}

export interface ServiceRequest {
  id: string
  type: string
  requestDate: string
  status: string
  details?: string
}

export interface UserData {
  name: string
  email: string
  avatar: string
  notifications: number
  appointments: Appointment[]
  shipments: Shipment[]
  documents: Document[]
  bills: Bill[]
  serviceRequests: ServiceRequest[]
}

export interface LoginData {
  email: string
  password: string
}
