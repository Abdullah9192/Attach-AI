import { Suspense, lazy } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingFallback } from '@/components/loading-fallback'

const KnowledgePage = lazy(() =>
  import('@/components/knowledge-page').then((mod) => ({
    default: mod.KnowledgePage,
  }))
)

export default function Knowledge() {
  return (
    <ErrorBoundary featureName="AI Knowledge">
      <Suspense fallback={<LoadingFallback message="Loading AI Knowledge" />}>
        <KnowledgePage />
      </Suspense>
    </ErrorBoundary>
  )
}
