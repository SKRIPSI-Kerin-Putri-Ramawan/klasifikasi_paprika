"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Modal } from "@/components/ui/modal"
import { supabase } from "@/lib/supabase"

type DetailItem = {
  type: 'variety' | 'nutrition' | 'anatomy' | 'internal'
  title: string
  subtitle?: string
  description: string
  icon?: string
  image?: string
  color?: string
  bg?: string
  importance?: string
  extra?: { label: string; value: string }[]
}


const varieties = [
  { 
    name: "Paprika Merah", 
    desc: "Memiliki rasa termanis dan kandungan Vitamin C tertinggi. Merupakan tahap matang sempurna.", 
    image: "/red-paprika.png",
    light: "bg-red-50",
    text: "text-red-700" 
  },
  { 
    name: "Paprika Kuning", 
    desc: "Rasa lebih ringan dari merah, kaya akan zat besi dan nutrisi potasium untuk pertumbuhan.", 
    image: "/yellow-paprika.png",
    light: "bg-yellow-50",
    text: "text-yellow-700" 
  },
  { 
    name: "Paprika Hijau", 
    desc: "Paprika yang dipanen lebih awal. Memiliki rasa sedikit pahit dan tajam yang khas.", 
    image: "/green-paprika.png",
    light: "bg-emerald-50",
    text: "text-emerald-700" 
  },
  { 
    name: "Paprika Oranye", 
    desc: "Varian perantara dengan tekstur renyah dan kandungan beta-karoten yang tinggi.", 
    image: "/orange-paprika.png",
    light: "bg-orange-50",
    text: "text-orange-700" 
  },
]

const nutritionalBenefits = [
  { title: "Super Vitamin C", desc: "Paprika merah mengandung 3x lebih banyak Vitamin C daripada jeruk. Sangat baik untuk sistem imun.", icon: "shutter_speed", color: "text-red-600", bg: "bg-red-50" },
  { title: "Antioksidan Tinggi", desc: "Kaya akan beta-karoten dan likopen yang membantu melindungi sel tubuh dari radikal bebas.", icon: "auto_fix_high", color: "text-orange-600", bg: "bg-orange-50" },
  { title: "Kesehatan Mata", desc: "Mengandung Lutein dan Zeaxanthin yang terbukti menjaga kesehatan retina dan penglihatan.", icon: "visibility", color: "text-emerald-600", bg: "bg-emerald-50" },
]


const anatomyItems: DetailItem[] = [
  { 
    type: 'anatomy', 
    title: "Margin Daun", 
    subtitle: "Entire (Rata)", 
    description: "Tepi daun paprika umumnya rata (entire), tidak bergerigi. Ini adalah karakteristik kunci dari genus Capsicum.",
    icon: "straighten",
    bg: "bg-emerald-100",
    color: "text-emerald-700",
    extra: [{ label: "Tipe", value: "Integer" }, { label: "Kondisi Normal", value: "Mulus tanpa robekan" }]
  },
  { 
    type: 'anatomy', 
    title: "Ujung Daun", 
    subtitle: "Acutus (Runcing)", 
    description: "Memiliki ujung yang meruncing untuk memudahkan tetesan air jatuh (drip tip), mengurangi risiko pertumbuhan jamur.",
    icon: "architecture",
    bg: "bg-emerald-100",
    color: "text-emerald-700",
  },
  { 
    type: 'anatomy', 
    title: "Urat Daun", 
    subtitle: "Pinnate (Menyirip)", 
    description: "Pola pertulangan menyirip (pinnate) yang mendistribusikan nutrisi secara efisien ke seluruh helaian daun.",
    icon: "account_tree",
    bg: "bg-emerald-100",
    color: "text-emerald-700",
  },
  { 
    type: 'internal', 
    title: "Kutikula", 
    subtitle: "Waxy Layer", 
    description: "Lapisan lilin transparan yang mencegah penguapan air berlebih dan menghambat perkecambahan spora jamur pada permukaan daun.",
    importance: "Kutikula yang tipis membuat tanaman lebih rentan terhadap Bacterial Spot.",
    icon: "layers",
    bg: "bg-blue-50",
    color: "text-blue-600"
  },
  { 
    type: 'internal', 
    title: "Stomata", 
    subtitle: "Mulut Daun", 
    description: "Pori-pori kecil untuk respirasi dan fotosintesis. Sel penjaga mengontrol buka-tutup pori berdasarkan kelembapan.",
    importance: "Titik lemah: Bakteri pathogen seringkali berenang masuk melalui stomata saat kondisi lembap.",
    icon: "air",
    bg: "bg-teal-50",
    color: "text-teal-600"
  },
]




export default function DashboardPage() {
  const [selectedDetail, setSelectedDetail] = useState<DetailItem | null>(null)
  const [latestAnalysis, setLatestAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLatest() {
      const { data, error } = await supabase
        .from('classifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
      
      if (data && data.length > 0) setLatestAnalysis(data[0])
      setLoading(false)
    }
    fetchLatest()
  }, [])



  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 bg-surface">
      
      {/* Hero Welcome Section */}
      <section className="relative rounded-3xl overflow-hidden bg-emerald-900 min-h-[350px] flex items-center shadow-2xl">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/pepper-dashboard.png" 
            className="w-full h-full object-cover opacity-40 scale-105"
            alt="Pepper background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 p-12 max-w-2xl space-y-6">
          <span className="px-4 py-1 bg-emerald-500/20 backdrop-blur-md rounded-full text-emerald-300 text-[10px] font-black uppercase tracking-[0.3em] border border-emerald-500/30">
            Pusat Informasi Botani
          </span>
          <h1 className="text-5xl font-heading font-black text-white leading-tight">
            Jelajahi Dunia <br/>
            <span className="text-emerald-400 italic font-serif">Capsicum Annuum</span>
          </h1>
          <p className="text-emerald-100/80 font-sans text-lg max-w-lg leading-relaxed">
            Identifikasi penyakit daun, pelajari siklus hidup, dan temukan cara terbaik untuk merawat tanaman paprika Anda dengan teknologi AI PapriCare.
          </p>
        </div>
      </section>

      {/* Grid Content: Varieties & Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Varieties Section (Left) */}
        <div className="lg:col-span-8 space-y-8">
          <header className="flex justify-between items-end px-2">
            <div>
              <h2 className="text-2xl font-heading font-black tracking-tight text-on-surface">Varietas jenis paprika Populer</h2>
              <p className="text-on-surface-variant font-sans text-sm">Mengenal karakteristik unik setiap varian warna.</p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {varieties.map((v) => (
              <button 
                key={v.name} 
                onClick={() => setSelectedDetail({
                  type: 'variety',
                  title: v.name,
                  description: v.desc,
                  image: v.image,
                  bg: v.light,
                  color: v.text
                })}
                className={cn("p-6 rounded-2xl border border-outline-variant/10 transition-all hover:shadow-lg flex items-center gap-6 text-left group", v.light)}
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md shrink-0 group-hover:scale-105 transition-transform">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className={cn("text-lg font-heading font-extrabold mb-2", v.text)}>{v.name}</h3>
                  <p className="text-on-surface-variant text-xs leading-relaxed font-sans italic opacity-80">
                    "{v.desc}"
                  </p>
                </div>
              </button>
            ))}
          </div>


          {/* Nutritional Benefits Section */}
          <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/5">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-heading font-black text-on-surface tracking-tight">Nutrisi & Manfaat Kesehatan</h3>
                  <Link href="/nutrition" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Lihat Detail Gizi</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {nutritionalBenefits.map((benefit) => (
                    <button 
                      key={benefit.title} 
                      onClick={() => setSelectedDetail({
                        type: 'nutrition',
                        title: benefit.title,
                        description: benefit.desc,
                        icon: benefit.icon,
                        bg: benefit.bg,
                        color: benefit.color
                      })}
                      className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm space-y-4 group hover:border-emerald-200 transition-all text-left"
                    >
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", benefit.bg)}>
                        <span className={cn("material-symbols-outlined", benefit.color)}>{benefit.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface mb-2">{benefit.title}</h4>
                        <p className="text-xs text-on-surface-variant leading-relaxed font-sans">{benefit.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>

          </div>
        </div>

        {/* Info Bento (Right) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-emerald-600 text-5xl mb-4">psychiatry</span>
            <h3 className="text-xl font-heading font-black text-emerald-900 mb-2">Anatomi Daun</h3>
            <p className="text-emerald-800/70 text-sm font-sans mb-6">Daun paprika memiliki pola venasi menyirip yang kompleks. Bercak terkecil di area ini seringkali menjadi indikasi awal infeksi patogen.</p>
            <ul className="w-full space-y-2 mb-6">
              {anatomyItems.map((item) => (
                <li key={item.title}>
                  <button 
                    onClick={() => setSelectedDetail(item)}
                    className="w-full flex items-center justify-between p-3 bg-white/60 rounded-xl text-xs font-bold text-emerald-800 hover:bg-white transition-colors group"
                  >
                    <span>{item.title}</span>
                    <span className="px-2 py-0.5 bg-emerald-100 rounded group-hover:bg-emerald-200">{item.subtitle}</span>
                  </button>
                </li>
              ))}
            </ul>

            <Link 
              href="/anatomy"
              className="w-full py-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition-colors text-center shadow-lg shadow-emerald-900/10 active:scale-95 transition-transform"
            >
              Eksplorasi Lengkap
            </Link>

          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/10 shadow-sm space-y-6">
            <h4 className="text-sm font-heading font-black text-on-surface tracking-tight uppercase">Analisis Terakhir</h4>
            <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/5">
              {loading ? (
                <div className="py-8 text-center animate-pulse text-stone-300">...</div>
              ) : latestAnalysis ? (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", latestAnalysis.result === 'Sehat' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                      <span className="material-symbols-outlined">{latestAnalysis.result === 'Sehat' ? 'verified' : 'warning'}</span>
                    </div>
                    <div>
                      <p className="text-xs font-black text-on-surface">{latestAnalysis.result}</p>
                      <p className="text-[10px] text-stone-500 font-bold">
                        {new Date(latestAnalysis.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} • {(latestAnalysis.confidence * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <Link href="/history" className="block w-full py-2 bg-on-surface text-surface text-[10px] font-black uppercase tracking-widest rounded-lg hover:opacity-90 text-center">
                    Buka Riwayat
                  </Link>
                </>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <p className="text-[10px] text-stone-400 font-bold italic">Belum ada analisis</p>
                  <Link href="/scan" className="block w-full py-2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-emerald-700 text-center">
                    Mulai Scan
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t border-outline-variant/10">
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Tips Perawatan</p>
              <div className="flex items-start gap-3">
                 <span className="material-symbols-outlined text-primary text-lg">water_drop</span>
                 <p className="text-[11px] text-on-surface-variant leading-tight">Pastikan penyiraman dilakukan pada pangkal batang, bukan pada permukaan daun.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Anatomy Modal */}
      <Modal 
        isOpen={!!selectedDetail} 
        onClose={() => setSelectedDetail(null)}
        title={selectedDetail?.title}
      >
        {selectedDetail && (
          <div className="space-y-6">
            <div className={cn("aspect-video rounded-3xl flex items-center justify-center overflow-hidden border", selectedDetail.bg, "border-black/5")}>
              {selectedDetail.image ? (
                <img src={selectedDetail.image} alt={selectedDetail.title} className="w-2/3 h-2/3 object-contain drop-shadow-2xl" />
              ) : (
                <span className={cn("material-symbols-outlined text-7xl", selectedDetail.color)}>{selectedDetail.icon || 'star'}</span>
              ) }
            </div>
            
            <div className="space-y-4">
              {selectedDetail.subtitle && (
                <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", selectedDetail.bg, selectedDetail.color)}>
                  {selectedDetail.subtitle}
                </span>
              )}
              <p className="text-stone-600 leading-relaxed font-sans">{selectedDetail.description}</p>
              
              {selectedDetail.importance && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                   <span className="material-symbols-outlined text-amber-600">warning</span>
                   <div>
                      <p className="text-[10px] font-black text-amber-900 uppercase tracking-widest">Pentingnya Diagnosa</p>
                      <p className="text-xs text-amber-800/80">{selectedDetail.importance}</p>
                   </div>
                </div>
              )}

              {selectedDetail.extra && (
                <div className="grid grid-cols-2 gap-4">
                  {selectedDetail.extra.map((ex) => (
                    <div key={ex.label} className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">{ex.label}</p>
                      <p className="text-sm font-bold text-on-surface">{ex.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {selectedDetail.type === 'anatomy' && (
                <Link 
                  href="/anatomy" 
                  className="inline-flex items-center gap-2 text-emerald-600 font-bold text-xs hover:underline pt-4"
                >
                  Pelajari anatomi selengkapnya
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </Modal>

    </div>
  )
}
