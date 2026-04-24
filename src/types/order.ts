import type { MenuItem } from '../data/menu'

export type PlacedOrderLine = {
  menuItem: MenuItem
  quantity: number
  lineTotalCents: number
}

export type OrderConfirmationState = {
  orderId: string
  placedAt: string
  customerName: string
  phone: string
  address: string
  deliveryNotes: string
  paymentMethod: string
  lines: PlacedOrderLine[]
  totalCents: number
}
