import { Suspense, lazy } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { LoadingFallback } from '@/components/loading-fallback'

const ContactsPage = lazy(() =>
  import('@/components/contacts-page').then((mod) => ({
    default: mod.ContactsPage,
  }))
)

export default function Page() {
  return (
    <ErrorBoundary featureName="Contacts">
      <Suspense fallback={<LoadingFallback message="Loading Contacts" />}>
        <ContactsPage />
      </Suspense>
    </ErrorBoundary>
  )
}
