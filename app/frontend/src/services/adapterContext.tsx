import { createContext, useContext } from 'react'
import { DatabaseAdapter } from '../patterns/adapter/DatabaseAdapter'

export const AdapterContext = createContext<DatabaseAdapter | null>(null)

export function useAdapter(): DatabaseAdapter | null {
  return useContext(AdapterContext)
}

export function AdapterProvider({
  adapter,
  children,
}: {
  adapter: DatabaseAdapter
  children: React.ReactNode
}) {
  return (
    <AdapterContext.Provider value={adapter}>
      {children}
    </AdapterContext.Provider>
  )
}
