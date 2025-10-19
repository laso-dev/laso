export interface LasoConfig {
  basePath: string
  uiVersion?: string
}

export interface GenericRequest {
  method: string
  url: string
  headers: Record<string, string | string[] | undefined>
  query: Record<string, string | string[] | undefined>
  body?: unknown
}

export interface GenericResponse {
  status: number
  headers?: Record<string, string>
  body: string | object
}

export type RouteHandler = (req: GenericRequest) => GenericResponse | Promise<GenericResponse>

export interface Route {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  handler: RouteHandler
}

