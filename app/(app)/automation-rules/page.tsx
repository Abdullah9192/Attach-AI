import { Suspense, lazy } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingFallback } from '@/components/loading-fallback'

const AutomationRulesPage = lazy(() =>
  import('@/components/automation-rules-page').then((mod) => ({
    default: mod.AutomationRulesPage,
  }))
)

export default function Page() {
  return (
    <ErrorBoundary featureName="Automation Rules">
      <Suspense fallback={<LoadingFallback message="Loading Automation Rules" />}>
        <AutomationRulesPage />
      </Suspense>
    </ErrorBoundary>
  )
}
