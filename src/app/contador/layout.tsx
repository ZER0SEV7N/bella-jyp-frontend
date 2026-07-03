import { ReactNode } from 'react'

export default function ContadorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <div>{children}</div>
}
