import { Suspense, lazy } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingFallback } from '@/components/loading-fallback'

const CampaignsPage = lazy(() =>
  import('@/components/campaigns-page').then((mod) => ({
    default: mod.CampaignsPage,
  }))
)

export default function Page() {
  return (
    <ErrorBoundary featureName="Campaigns">
      <Suspense fallback={<LoadingFallback message="Loading Campaigns" />}>
        <CampaignsPage />
      </Suspense>
    </ErrorBoundary>
  )
}
