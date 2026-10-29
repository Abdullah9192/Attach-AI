import { mockAdminOrganisations } from '@/mock/admin-organisations'
import { OrganisationDetailPage } from '@/components/admin/organisation-detail-page'
import { notFound } from 'next/navigation'

export default function OrganisationDetailRoute({ params }: { params: { id: string } }) {
  const organisation = mockAdminOrganisations.find(org => org.id === params.id)
  
  if (!organisation) {
    notFound()
  }

  return <OrganisationDetailPage organisation={organisation} />
}
