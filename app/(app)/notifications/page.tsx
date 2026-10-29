import { Suspense, lazy } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingFallback } from '@/components/loading-fallback'

const NotificationsPage = lazy(() =>
  import('@/components/notifications-page').then((mod) => ({
    default: mod.NotificationsPage,
  }))
)

export default function Page() {
  return (
    <ErrorBoundary featureName="Notifications">
      <Suspense fallback={<LoadingFallback message="Loading Notifications" />}>
        <NotificationsPage />
      </Suspense>
    </ErrorBoundary>
  )
}
