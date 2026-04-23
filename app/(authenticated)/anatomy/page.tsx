"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { cn } from "@/lib/utils"

const morphologyData = [
  { label: "Jenis Daun", value: "Daun Tunggal", desc: "Satu helaian pada satu petiolus (tangkai).", icon: "potted_plant" },
  { label: "Bentuk Helaian", value: "Ovatus - Lanset", desc: "Berbentuk bulat telur hingga melanset.", icon: "leafy_video" },
  { label: "Ujung & Tepi", value: "Acutus & Integer", desc: "Ujung runcing dengan tepi daun rata.", icon: "straighten" },
  { label: "Pertulangan", value: "Pinnate (Menyirip)", desc: "Pola tulang daun menjalar dari ibu tulang.", icon: "Account_Tree" },
]

export default function AnatomyPage() {
  const [internalAnatomy, setInternalAnatomy] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnatomy() {
      const { data, error } = await supabase
        .from('anatomy')
        .select('*')
      
      if (data) setInternalAnatomy(data)
      setLoading(false)
    }
    fetchAnatomy()
  }, [])
  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      {/* Hero Section */}
      <section className="bg-emerald-950 py-24 px-8 text-center space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
        <div className="relative z-10">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8 hover:text-emerald-300 transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Kembali ke Dashboard
          </Link>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter">
            Anatomi <span className="text-emerald-400 font-serif italic">Daun Paprika</span>
          </h1>
          <p className="max-w-2xl mx-auto text-emerald-100/70 text-lg font-sans">
            Menelusuri keunikan morfologi dan kerumitan struktur internal Capsicum annuum untuk pemahaman diagnosa yang lebih presisi.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8 -mt-12 relative z-20 space-y-16">
        
        {/* Morphology Section */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-stone-100">
           <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                 <span className="material-symbols-outlined text-emerald-700">visibility</span>
              </div>
              <h2 className="text-3xl font-heading font-black text-on-surface tracking-tight">Morfologi Luar</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {morphologyData.map((m) => (
                <div key={m.label} className="space-y-3 p-6 rounded-2xl bg-stone-50 border border-stone-100/50 hover:border-emerald-200 transition-colors">
                   <span className="material-symbols-outlined text-emerald-600 text-2xl">{m.icon}</span>
                   <div>
                      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{m.label}</p>
                      <h4 className="text-lg font-bold text-on-surface">{m.value}</h4>
                   </div>
                   <p className="text-xs text-stone-500 leading-relaxed font-sans">{m.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Microscopic Anatomy Grid */}
        <div className="space-y-12">
           <div className="text-center space-y-2">
              <h2 className="text-4xl font-heading font-black text-on-surface tracking-tight">Struktur Mikroskopis</h2>
              <p className="text-stone-500 font-sans max-w-xl mx-auto">Melihat lebih dekat jaringan internal yang menjadi medan tempur antara tanaman dan patogen.</p>
           </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {loading ? (
                <div className="col-span-full py-20 text-center animate-pulse text-emerald-900/40 font-black uppercase tracking-widest">
                  Mengintip Struktur Mikroskopis...
                </div>
              ) : internalAnatomy.length > 0 ? (
                internalAnatomy.map((a) => (
                  <div key={a.name} className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-sm overflow-hidden relative group">
                    <div className={cn("absolute top-0 right-0 w-24 h-24 opacity-5 transition-transform group-hover:scale-150 group-hover:opacity-10", a.color)}></div>
                    <div className="flex gap-6">
                        <div className={cn("w-16 h-16 rounded-3xl shrink-0 flex items-center justify-center shadow-lg transform transition-transform group-hover:rotate-12", a.color)}>
                          <span className="material-symbols-outlined text-white text-3xl">{a.icon || 'layers'}</span>
                        </div>
                        <div className="space-y-4">
                          <div>
                              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">{a.function}</p>
                              <h3 className="text-2xl font-heading font-black text-on-surface">{a.name}</h3>
                          </div>
                          <p className="text-sm text-stone-600 leading-relaxed font-sans">{a.description || a.desc}</p>
                          <div className="pt-4 border-t border-stone-50">
                              <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-amber-500 text-md">warning</span>
                                <p className="text-[11px] font-bold text-stone-500 font-sans italic italic-custom">
                                    <span className="text-on-surface uppercase tracking-tighter mr-1">Relevansi Diagnosa:</span>
                                    {a.importance}
                                  </p>
                              </div>
                          </div>
                        </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-stone-400 font-sans italic">
                  Data anatomi belum tersedia.
                </div>
              )}
            </div>
        </div>

        {/* Pathology Connection Section */}
        <section className="bg-emerald-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
           <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-emerald-800 rounded-tl-full opacity-50 blur-3xl -z-0"></div>
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                 <h2 className="text-4xl font-heading font-black tracking-tight leading-none">Mengapa Anatomi Itu Vital?</h2>
                 <p className="text-emerald-100 opacity-80 leading-relaxed font-sans">
                    Memahami anatomi bukan sekadar teori botani. Bagi sistem kecerdasan buatan, perubahan halus pada struktur fisik daun—seperti ukuran stomata atau ketebalan kutikula—adalah sinyal awal sebelum gejala penyakit terlihat jelas secara kasat mata.
                 </p>
                 <ul className="space-y-4">
                    {[
                       "Deteksi dini serangan bakteri melalui jalur stomata.",
                       "Identifikasi degradasi kloroplas akibat infeksi virus.",
                       "Pemahaman mekanisme pertahanan fisik tanaman (Resistensi Struktur)."
                    ].map((item, i) => (
                       <li key={i} className="flex items-center gap-3">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                          <span className="text-sm font-medium text-emerald-50 italic italic-custom">{item}</span>
                       </li>
                    ))}
                 </ul>
              </div>
              <div className="p-8 bg-black/20 backdrop-blur-xl rounded-[2rem] border border-white/10 space-y-6">
                 <h4 className="font-heading font-black text-xl text-emerald-400 italic italic-custom">Kilas Pathology:</h4>
                 <div className="space-y-4">
                    <div className="flex gap-4">
                       <span className="material-symbols-outlined text-red-400">coronavirus</span>
                       <p className="text-xs text-emerald-100/70 leading-relaxed">
                          <strong className="text-white block mb-1">Mosaik Virus</strong>
                          Menghancurkan klorofil di dalam sel mesofil palisade, menyebabkan warna belang kuning-hijau yang khas.
                       </p>
                    </div>
                    <div className="flex gap-4">
                       <span className="material-symbols-outlined text-amber-400">bug_report</span>
                       <p className="text-xs text-emerald-100/70 leading-relaxed">
                          <strong className="text-white block mb-1">Bacterial Spot</strong>
                          Sering dimulai dari epidermis bawah karena kumpulan stomata yang lebih padat di sana.
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* CTA Footer */}
        <section className="text-center pt-10">
           <Link href="/scan" className="px-12 py-5 bg-on-surface text-surface font-black rounded-full hover:scale-105 transition-transform shadow-2xl flex items-center justify-center gap-4 w-fit mx-auto">
              Uji Anatomi Daun Anda
              <span className="material-symbols-outlined">biotech</span>
           </Link>
        </section>

      </div>
    </div>
  )
}
