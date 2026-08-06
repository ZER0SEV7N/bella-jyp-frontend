// Cliente Axios base, sin conocimiento de autenticacion

import axios from 'axios'

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api',
  withCredentials: true,
  headers: { Accept: 'application/json' },
})
