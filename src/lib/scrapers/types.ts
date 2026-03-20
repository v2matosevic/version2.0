export type TrackingStatus =
  | 'info_received'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'exception'

export type TrackingEvent = {
  status: TrackingStatus
  location: string
  description: string
  eventTime: string
}

export type TrackingResult = {
  success: boolean
  carrier: string
  events: TrackingEvent[]
  currentStatus: TrackingStatus
  error?: string
}
