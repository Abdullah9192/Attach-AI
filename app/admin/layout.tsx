import { AdminAuthProvider } from '@/contexts/admin-auth-context'
import { AdminLayout } from '@/components/admin/admin-layout'

export default function AdminLayoutRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AdminAuthProvider>
  )
}
