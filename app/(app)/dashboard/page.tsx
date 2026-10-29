import { Suspense, lazy } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingFallback } from '@/components/loading-fallback'

const DashboardPage = lazy(() => import('@/components/dashboard-page').then(mod => ({ default: mod.DashboardPage })))

export default function Dashboard() {
  return (
    <ErrorBoundary featureName="Dashboard">
      <Suspense fallback={<LoadingFallback message="Loading Dashboard" />}>
        <DashboardPage />
      </Suspense>
    </ErrorBoundary>
  )
}
