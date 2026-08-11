import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { useState, type ReactNode } from 'react'

import { AuthProvider } from '@/features/auth/providers/auth-provider'

/** Provee Query y sesion para las pruebas de la feature auth. */
export function AuthTestProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: false },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}

/** Renderiza componentes auth con los providers que usan en la aplicacion. */
export function renderWithAuthProviders(children: ReactNode) {
  return render(<AuthTestProviders>{children}</AuthTestProviders>)
}
