"use client"

import { useEffect, useState } from "react"
import { createSupabaseClient } from "@/utils/supabase/client"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function HistoryPage() {
  const supabase = createSupabaseClient()
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)

  useEffect(() => {
    async function fetchLogs() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setIsGuest(true)
          setLoading(false)
          return
        }

        const { data, error } = await supabase
          .from("classifications")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
        
        if (error) throw error
        setLogs(data || [])
      } catch (error) {
        console.error("Error fetching logs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data klasifikasi ini?")) return

    try {
      const { error } = await supabase
        .from("classifications")
        .delete()
        .eq("id", id)
      
      if (error) throw error
      setLogs(logs.filter(log => log.id !== id))
    } catch (error) {
      console.error("Error deleting log:", error)
      alert("Gagal menghapus data.")
    }
  }

  return (
    <div className="p-8 space-y-8 bg-surface" suppressHydrationWarning>
      <header className="max-w-6xl mx-auto flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-heading font-bold text-on-surface tracking-tight">Riwayat Klasifikasi</h2>
          <p className="text-on-surface-variant font-sans">Arsip lengkap dari semua log analisis spesimen botani.</p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-20 text-center animate-pulse text-emerald-950/40 font-black uppercase tracking-widest font-heading">
              Sinkronisasi Riwayat Neural...
            </div>
          ) : isGuest ? (
            <div className="col-span-full py-24 bg-surface-container-lowest rounded-[3rem] border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center p-8 space-y-8 shadow-sm">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                <span className="material-symbols-outlined text-primary text-5xl">history_toggle_off</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-heading font-black text-on-surface tracking-tight">Mode Tamu Aktif</h3>
                <p className="text-on-surface-variant font-sans text-lg max-w-md mx-auto leading-relaxed">
                  Riwayat klasifikasi hanya tersedia untuk pengguna terdaftar. Login sekarang untuk menyimpan hasil analisis Anda secara permanen di cloud.
                </p>
              </div>
              <div className="flex gap-4">
                <Link 
                  href="/login"
                  className="px-10 py-4 bg-primary text-on-primary font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-3 text-sm tracking-widest"
                >
                  <span className="material-symbols-outlined text-lg">login</span>
                  MASUK / DAFTAR
                </Link>
              </div>
            </div>
          ) : logs.length > 0 ? (
            logs.map((log) => (
              <div key={log.id} className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="relative h-48 bg-stone-100">
                  <img src={log.image_url} alt={log.result} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest", 
                      log.result === 'Daun Sehat (Healthy Leaf)' ? "bg-emerald-500" : "bg-red-500"
                    )}>
                      {log.status || (log.result === 'Daun Sehat (Healthy Leaf)' ? 'Optimal' : 'Kritis')}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1" suppressHydrationWarning>
                        {log.created_at ? new Date(log.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Tanggal tidak tersedia'}
                      </p>
                      <h4 className="text-xl font-heading font-black text-on-surface">{log.result || 'Hasil tidak tersedia'}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Akurasi</p>
                      <p className="text-lg font-bold text-emerald-600">{(log.confidence * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-stone-50 flex justify-between items-center">
                    <span className="text-xs font-medium text-stone-500 font-sans italic italic-custom">ID: {log.id ? String(log.id).slice(0, 8) : 'N/A'}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleDelete(log.id)}
                        className="p-2 bg-stone-50 rounded-xl hover:bg-red-50 hover:text-red-700 transition-colors"
                        title="Hapus"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                      <Link 
                        href={`/history/${log.id}`}
                        className="p-2 bg-stone-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        title="Lihat Detail"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-stone-400 font-sans italic">
              Belum ada riwayat klasifikasi. Mulai dengan melakukan scan pertama Anda.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
