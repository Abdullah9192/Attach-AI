import { AdminAuthProvider } from '@/contexts/admin-auth-context'
import { SuperadminLayout } from '@/components/superadmin/superadmin-layout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <SuperadminLayout>{children}</SuperadminLayout>
    </AdminAuthProvider>
  )
}
