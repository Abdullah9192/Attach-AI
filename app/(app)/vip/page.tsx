import { Suspense, lazy } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingFallback } from '@/components/loading-fallback'

const VIPPage = lazy(() =>
  import('@/components/vip-page').then((mod) => ({ default: mod.VIPPage }))
)

export const metadata = {
  title: 'VIP Guests & Clients - ATTACHAI',
  description: 'Quiet intelligence for the relationships that matter most.',
}

export default function Page() {
  return (
    <ErrorBoundary featureName="VIP Management">
      <Suspense fallback={<LoadingFallback message="Loading VIP Management" />}>
        <VIPPage />
      </Suspense>
    </ErrorBoundary>
  )
}
