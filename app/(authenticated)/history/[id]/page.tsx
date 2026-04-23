"use client"

import { useEffect, useState, use } from "react"
import { createSupabaseClient } from "@/utils/supabase/client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ClassificationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const supabase = createSupabaseClient()
  const router = useRouter()
  const [log, setLog] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDetail() {
      try {
        const { data, error } = await supabase
          .from("classifications")
          .select("*")
          .eq("id", id)
          .single()
        
        if (error) throw error
        setLog(data)
      } catch (error) {
        console.error("Error fetching detail:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center animate-pulse">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-primary font-bold uppercase tracking-widest text-xs">Memuat Detail...</p>
        </div>
      </div>
    )
  }

  if (!log) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface">
        <span className="material-symbols-outlined text-6xl text-stone-200 mb-4">sentiment_dissatisfied</span>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Data Tidak Ditemukan</h2>
        <p className="text-stone-500 mb-6">Riwayat klasifikasi mungkin telah dihapus.</p>
        <Link href="/history" className="px-6 py-2 bg-primary text-white rounded-xl font-bold shadow-lg">
          Kembali ke Riwayat
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 bg-surface">
      <header className="flex justify-between items-center">
        <div>
          <Link href="/history" className="text-primary flex items-center gap-2 text-sm font-bold mb-4 hover:gap-1 transition-all">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            KEMBALI KE RIWAYAT
          </Link>
          <h2 className="text-4xl font-heading font-extrabold text-on-surface tracking-tight mb-2">Laporan Analisis</h2>
          <p className="text-on-surface-variant font-sans">Detail diagnosa spesimen botani - ID: {log.id}</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2 bg-white border border-stone-100 rounded-xl hover:bg-stone-50 transition-all text-stone-500">
            <span className="material-symbols-outlined">share</span>
          </button>
          <button className="p-2 bg-white border border-stone-100 rounded-xl hover:bg-stone-50 transition-all text-stone-500">
            <span className="material-symbols-outlined">print</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Specimen Profile */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-stone-100">
            <div className="relative aspect-square bg-stone-100">
              <img src={log.image_url} alt={log.result} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6">
                <span className={cn("px-4 py-1.5 rounded-full text-xs font-black text-white uppercase tracking-widest shadow-lg", 
                  log.result === 'Sehat' ? "bg-emerald-500" : "bg-red-500"
                )}>
                  {log.result === 'Sehat' ? 'Optimal' : 'Kritis'}
                </span>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Diagnosis Utama</p>
                  <h3 className="text-3xl font-heading font-black text-on-surface leading-tight">{log.result}</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Akurasi AI</p>
                  <p className="text-3xl font-black text-emerald-600">{(log.confidence * 100).toFixed(1)}%</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-stone-50 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Spesies</p>
                  <p className="font-bold text-on-surface italic">{log.species || 'Capsicum annuum'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Tanggal Scan</p>
                  <p className="font-bold text-on-surface">
                    {new Date(log.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Neural Insights & Actions */}
        <div className="space-y-8">
          <section className="bg-emerald-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 w-48 h-48 bg-emerald-500 rounded-full blur-[100px] opacity-20 -mr-24 -mt-24"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                  <span className="material-symbols-outlined text-emerald-400">insights</span>
                </div>
                <h4 className="text-lg font-bold">Neural Insights</h4>
              </div>
              <p className="text-emerald-100/70 text-sm leading-relaxed font-sans italic">
                {log.result === 'Sehat' 
                  ? "Spesimen menunjukkan integritas seluler yang optimal tanpa tanda-tanda invasi patogen. Klorofil berada dalam rentang normal."
                  : "Analisis neural mendeteksi anomali pada pola morfologi daun yang mengarah pada gejala patogen spesifik. Tindakan segera diperlukan."}
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">Rangkuman Rekomendasi</h4>
            <div className="space-y-4">
              {[
                { title: "Karantina Spesimen", desc: "Pisahkan tanaman yang terinfeksi untuk mencegah penyebaran lateral.", icon: "shutter_speed" },
                { title: "Manajemen Nutrisi", desc: "Berikan asupan NPK yang seimbang untuk meningkatkan daya tahan.", icon: "precision_manufacturing" },
                { title: "Monitoring Rutin", desc: "Lakukan scan ulang setiap 3 hari untuk memantau progres pemulihan.", icon: "analytics" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-emerald-600">{item.icon}</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-on-surface text-sm">{item.title}</h5>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="pt-4">
            <button 
              onClick={() => router.push('/treatment')}
              className="w-full py-4 bg-primary text-white font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest text-xs"
            >
              <span className="material-symbols-outlined">medication</span>
              Lihat Panduan Penanganan Lengkap
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
