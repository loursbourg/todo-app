import application from '@/constants/application'

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: Record<string, unknown>
  headers?: Record<string, string>
}

type FetchBase = <T>(url: string, options?: FetchOptions) => Promise<T>

function useFetchBase(): FetchBase {
  const base = `${application.baseURL}`

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  return async function fetchBase<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {} } = options

    const fullUrl = url.startsWith('http') ? url : `${base}${url}`

    const config: RequestInit = {
      method,
      headers: { ...defaultHeaders, ...headers },
    }

    if (body) {
      config.body = JSON.stringify(body)
    }

    const response = await fetch(fullUrl, config)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return response.json() as Promise<T>
  }
}

export default useFetchBase
