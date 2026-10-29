import { Suspense, lazy } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingFallback } from '@/components/loading-fallback'

const SettingsPage = lazy(() =>
  import('@/components/settings-page').then((mod) => ({
    default: mod.SettingsPage,
  }))
)

export default function Settings() {
  return (
    <ErrorBoundary featureName="Settings">
      <Suspense fallback={<LoadingFallback message="Loading Settings" />}>
        <SettingsPage />
      </Suspense>
    </ErrorBoundary>
  )
}
