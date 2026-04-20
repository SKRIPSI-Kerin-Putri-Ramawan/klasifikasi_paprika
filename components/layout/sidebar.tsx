"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dasbor", href: "/dashboard", icon: "dashboard" },
  { name: "Pemindaian", href: "/scan", icon: "biotech" },
  { name: "Riwayat", href: "/history", icon: "history" },
  { name: "Penanganan", href: "/treatment", icon: "medication" },
  { name: "Profil", href: "/profile", icon: "account_circle" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-stone-50 dark:bg-slate-950 flex flex-col border-r border-stone-200 dark:border-slate-800 z-50">
      <div className="px-6 py-8">
        <h1 className="font-heading text-2xl font-black text-emerald-900 dark:text-emerald-50 tracking-tighter">
          PhytoScan
        </h1>
        <p className="font-sans tracking-wide uppercase text-[10px] font-bold text-stone-500 mt-1">
          Precision Ag-Tech
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200 ease-in-out",
                isActive
                  ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100"
                  : "text-stone-600 dark:text-slate-400 hover:bg-stone-200/50 dark:hover:bg-slate-800/50"
              )}
            >
              <span className={cn(
                "material-symbols-outlined",
                isActive && "fill-current"
              )}>
                {item.icon}
              </span>
              <span className="font-sans tracking-wide uppercase text-[10px] font-bold">
                {item.name}
              </span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 mt-auto">
        <Link href="/scan" className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-lg">add_circle</span>
          <span>Mulai Analisis Baru</span>
        </Link>
      </div>
    </aside>
  )
}
