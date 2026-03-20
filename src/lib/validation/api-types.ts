export type FieldError = {
  field: string
  message: string
}

export type ApiSuccessResponse = {
  success: true
  id?: string
}

export type ApiValidationErrorResponse = {
  success: false
  errors: FieldError[]
}

export type ApiErrorResponse = {
  success: false
  error: string
}

export type BookingSuccessResponse = ApiSuccessResponse & {
  icsUrl: string
}

export type PricingSuccessResponse = ApiSuccessResponse & {
  validatedEstimate: {
    oneTime: [number, number]
    monthly: [number, number]
    yearly: [number, number]
  }
}

export type ChatSuccessResponse = {
  conversationId: string
  response: string
  sources: string[]
}

export type ApiResponse =
  | ApiSuccessResponse
  | ApiValidationErrorResponse
  | ApiErrorResponse
