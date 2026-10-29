import { Suspense, lazy } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingFallback } from '@/components/loading-fallback'

const ServiceInboxPage = lazy(() =>
  import('@/components/service-inbox-page').then((mod) => ({
    default: mod.ServiceInboxPage,
  }))
)

export default function Page() {
  return (
    <ErrorBoundary featureName="Service Inbox">
      <Suspense fallback={<LoadingFallback message="Loading Service Inbox" />}>
        <ServiceInboxPage />
      </Suspense>
    </ErrorBoundary>
  )
}
