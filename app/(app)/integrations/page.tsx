import { Suspense, lazy } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingFallback } from '@/components/loading-fallback'

const IntegrationsPage = lazy(() =>
  import('@/components/integrations-page').then((mod) => ({
    default: mod.IntegrationsPage,
  }))
)

export default function Integrations() {
  return (
    <ErrorBoundary featureName="Integrations">
      <Suspense fallback={<LoadingFallback message="Loading Integrations" />}>
        <IntegrationsPage />
      </Suspense>
    </ErrorBoundary>
  )
}
