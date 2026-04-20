"use client"

import Link from "next/link"
import { ClientOnly } from "@/components/client-only"

export default function NotFound() {
  return (
    <ClientOnly>
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-8xl font-heading font-black text-primary/20">404</h1>
            <h2 className="text-2xl font-heading font-bold text-on-surface">Halaman Tidak Ditemukan</h2>
            <p className="text-on-surface-variant font-sans">
              Maaf, halaman yang Anda cari telah dihapus atau tidak pernah ada.
            </p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="px-6 py-3 bg-primary text-on-primary font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Kembali ke Dasbor
            </Link>
          </div>
        </div>
      </div>
    </ClientOnly>
  )
}
