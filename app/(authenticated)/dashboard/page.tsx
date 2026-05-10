"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Modal } from "@/components/ui/modal"

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
    light: "bg-red-50 dark:bg-red-950/20",
    text: "text-red-700 dark:text-red-400" 
  },
  { 
    name: "Paprika Kuning", 
    desc: "Rasa lebih ringan dari merah, kaya akan zat besi dan nutrisi potasium untuk pertumbuhan.", 
    image: "/yellow-paprika.png",
    light: "bg-yellow-50 dark:bg-yellow-950/20",
    text: "text-yellow-700 dark:text-yellow-400" 
  },
  { 
    name: "Paprika Hijau", 
    desc: "Paprika yang dipanen lebih awal. Memiliki rasa sedikit pahit dan tajam yang khas.", 
    image: "/green-paprika.png",
    light: "bg-emerald-50 dark:bg-emerald-950/20",
    text: "text-emerald-700 dark:text-emerald-400" 
  },
  { 
    name: "Paprika Oranye", 
    desc: "Varian perantara dengan tekstur renyah dan kandungan beta-karoten yang tinggi.", 
    image: "/orange-paprika.png",
    light: "bg-orange-50 dark:bg-orange-950/20",
    text: "text-orange-700 dark:text-orange-400" 
  },
]

const damageFactors = [
  { title: "Serangan Hama", desc: "Hama seperti thrips, tungau, dan aphids dapat menyebabkan daun keriting, berlubang, menguning, hingga pertumbuhan tanaman terganggu.", icon: "bug_report", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/30" },
  { title: "Penyakit Jamur & Bakteri", desc: "Penyakit seperti bercak daun bakteri, antraknosa, dan layu fusarium dapat menyebabkan bercak hitam, daun menguning, hingga kerontokan daun.", icon: "science", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30" },
  { title: "Faktor Lingkungan", desc: "Kekurangan air, kelebihan air, suhu ekstrem, dan kurang cahaya matahari dapat merusak kondisi daun paprika.", icon: "thermostat", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/30" },
  { title: "Kekurangan Nutrisi", desc: "Kurangnya magnesium, kalsium, dan unsur hara lainnya dapat menyebabkan daun menguning serta pertumbuhan tidak optimal.", icon: "eco", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
]


const leafCareTips = [
  { title: "Penyiraman Teratur", desc: "Siram tanaman secukupnya dan hindari genangan air.", icon: "water_drop" },
  { title: "Cukup Sinar Matahari", desc: "Pastikan tanaman mendapat cahaya 6–8 jam per hari.", icon: "wb_sunny" },
  { title: "Gunakan Pupuk", desc: "Berikan pupuk secara berkala sesuai kebutuhan tanaman.", icon: "eco" },
  { title: "Periksa Daun", desc: "Cek daun secara rutin untuk mendeteksi gejala penyakit.", icon: "fact_check" },
  { title: "Buang Daun Terinfeksi", desc: "Pangkas daun yang terkena penyakit agar tidak menyebar.", icon: "content_cut" },
  { title: "Jaga Kebersihan", desc: "Bersihkan area sekitar tanaman dari gulma dan hama.", icon: "cleaning_services" },
]




export default function DashboardPage() {
  const [selectedDetail, setSelectedDetail] = useState<DetailItem | null>(null)
  useEffect(() => {
    // Other side effects if any
  }, [])



  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 bg-surface" suppressHydrationWarning>
      
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
            Sistem Deteksi
          </span>
          <h1 className="text-5xl font-heading font-black text-white leading-tight">
            PapriCare Smart Detection <br/>
            <span className="text-emerald-400 italic font-serif">Paprika Leaf Disease</span>
          </h1>
          <p className="text-emerald-100/80 font-sans text-lg max-w-lg leading-relaxed">
            Scan daun paprika Anda untuk mengetahui kondisi daun dan mendeteksi potensi penyakit secara cepat dan mudah.
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
                className={cn("p-6 rounded-2xl border border-outline/5 transition-all hover:shadow-lg flex items-center gap-6 text-left group", v.light)}
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


          {/* Damage Factors Section */}
          <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/5">
                <div className="mb-8">
                  <h3 className="text-xl font-heading font-black text-on-surface tracking-tight">Faktor Penyebab Daun Paprika Rusak</h3>
                  <p className="text-xs text-on-surface-variant font-medium mt-1 leading-relaxed">Kerusakan daun paprika dapat disebabkan oleh hama, penyakit, faktor lingkungan, dan kekurangan nutrisi yang memengaruhi pertumbuhan tanaman.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {damageFactors.map((factor) => (
                    <div 
                      key={factor.title} 
                      className="p-6 bg-card rounded-2xl border border-outline/5 shadow-sm space-y-4 group hover:border-emerald-500/30 transition-all text-left"
                    >
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", factor.bg)}>
                        <span className={cn("material-symbols-outlined", factor.color)}>{factor.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface mb-2">{factor.title}</h4>
                        <p className="text-xs text-on-surface-variant leading-relaxed font-sans">{factor.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-3xl p-8 border border-emerald-100 dark:border-emerald-900/30 flex flex-col items-center text-center h-full">
            <span className="material-symbols-outlined text-emerald-600 text-5xl mb-4">potted_plant</span>
            <h3 className="text-xl font-heading font-black text-emerald-900 dark:text-emerald-100 mb-2">Tips Perawatan Daun Paprika</h3>
            <p className="text-emerald-800/70 dark:text-emerald-300/70 text-sm font-sans mb-8 leading-relaxed">Menjaga kesehatan daun paprika agar tetap sehat dan terhindar dari penyakit.</p>
            
            <div className="w-full space-y-4 text-left">
              {leafCareTips.map((tip, index) => (
                <div key={tip.title} className="flex gap-4 p-4 bg-surface-container/20 dark:bg-emerald-950/20 backdrop-blur-sm rounded-2xl border border-outline/10 dark:border-emerald-800/20 hover:bg-surface-container/40 dark:hover:bg-emerald-900/40 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-lg">{tip.icon}</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
                      <span className="text-[10px] text-emerald-600/50 dark:text-emerald-400/40">{index + 1}.</span>
                      {tip.title}
                    </h4>
                    <p className="text-[10px] text-emerald-800/60 dark:text-emerald-300/60 font-medium leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))}
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
            <div className={cn("aspect-video rounded-3xl flex items-center justify-center overflow-hidden border", selectedDetail.bg, "border-outline/5")}>
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
              <p className="text-on-surface-variant leading-relaxed font-sans">{selectedDetail.description}</p>
              
              {selectedDetail.importance && (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/30 flex gap-4">
                   <span className="material-symbols-outlined text-amber-600">warning</span>
                   <div>
                      <p className="text-[10px] font-black text-amber-900 dark:text-amber-400 uppercase tracking-widest">Pentingnya Diagnosa</p>
                      <p className="text-xs text-amber-800/80 dark:text-amber-200/70">{selectedDetail.importance}</p>
                   </div>
                </div>
              )}

              {selectedDetail.extra && (
                <div className="grid grid-cols-2 gap-4">
                  {selectedDetail.extra.map((ex) => (
                    <div key={ex.label} className="p-4 rounded-2xl bg-surface-container-low border border-outline/5">
                      <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">{ex.label}</p>
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
