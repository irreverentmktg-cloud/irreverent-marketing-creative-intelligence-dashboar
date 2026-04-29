import type { ReactNode } from 'react'
import type { Brand, ScoreSnapshot } from '@cited/shared'
import { Sidebar } from './Sidebar'

interface DashboardLayoutProps {
  children: ReactNode
  brand?: Brand | null
  current?: ScoreSnapshot | null
}

export function DashboardLayout({
  children,
  brand,
  current,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-offwhite">
      <Sidebar
        brandName={brand?.name}
        category={brand?.category}
        score={current?.score}
      />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}
