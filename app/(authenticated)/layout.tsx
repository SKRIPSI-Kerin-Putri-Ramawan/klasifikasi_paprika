import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { ClientOnly } from "@/components/client-only"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientOnly>
      <div className="flex min-h-screen bg-surface" suppressHydrationWarning>
        <Sidebar />
        <div className="ml-64 flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </ClientOnly>
  )
}
