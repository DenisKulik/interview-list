export interface FetchBaseQueryError {
  status: number
  data?: { message?: string }
  error?: string
}

export interface SerializedError {
  message?: string
}
