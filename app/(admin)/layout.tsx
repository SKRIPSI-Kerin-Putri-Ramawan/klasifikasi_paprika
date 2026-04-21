import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { AdminHeader } from "@/components/layout/admin-header"
import { ClientOnly } from "@/components/client-only"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientOnly>
      <div className="flex min-h-screen bg-surface" suppressHydrationWarning>
        <AdminSidebar />
        <div className="ml-72 flex-1 flex flex-col min-h-screen">
          <AdminHeader />
          <main className="flex-1">
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ClientOnly>
  )
}
