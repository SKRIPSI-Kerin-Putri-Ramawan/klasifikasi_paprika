"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { cn } from "@/lib/utils"

const nutritionData = [
  { 
    color: "Merah", 
    calories: "31", 
    vitC: "128mg", 
    vitA: "3131 IU", 
    fiber: "2.1g", 
    desc: "Tertinggi dalam Vitamin A dan Likopen.",
    accent: "text-red-700",
    bg: "bg-red-50"
  },
  { 
    color: "Kuning", 
    calories: "27", 
    vitC: "183mg", 
    vitA: "200 IU", 
    fiber: "1.7g", 
    desc: "Kandungan Vitamin C paling dominan.",
    accent: "text-yellow-700",
    bg: "bg-yellow-50"
  },
  { 
    color: "Hijau", 
    calories: "20", 
    vitC: "80mg", 
    vitA: "370 IU", 
    fiber: "1.7g", 
    desc: "Rendah kalori, kaya klorofil & Vitamin K.",
    accent: "text-emerald-700",
    bg: "bg-emerald-50"
  },
]

const healthBenefitsFallback = [
  {
    title: "Benteng Imunitas",
    desc: "Kandungan Vitamin C yang sangat tinggi membantu produksi sel darah putih untuk melawan infeksi patogen dan virus.",
    icon: "shield_with_heart",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    title: "Kesehatan Retina",
    desc: "Lutein dan Zeaxanthin melindungi mata dari kerusakan oksidatif dan menurunkan risiko katarak.",
    icon: "visibility",
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
]

export default function NutritionPage() {
  const [nutrition, setNutrition] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNutrition() {
      const { data, error } = await supabase
        .from('nutrition')
        .select('*')
      
      if (data) setNutrition(data)
      setLoading(false)
    }
    fetchNutrition()
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
            Pusat Nutrisi <span className="text-emerald-400 font-serif italic">Paprika</span>
          </h1>
          <p className="max-w-2xl mx-auto text-emerald-100/70 text-lg font-sans">
            Panduan lengkap mengenai profil gizi, kandungan vitamin, dan manfaat kesehatan dari setiap varietas paprika.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-8 -mt-16 relative z-20 space-y-16">
        
        {/* Comparison Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nutritionData.map((data) => (
            <div key={data.color} className={cn("rounded-3xl p-8 shadow-xl border border-white/20 transition-transform hover:-translate-y-2", data.bg)}>
              <div className="flex justify-between items-start mb-6">
                <h3 className={cn("text-3xl font-heading font-black", data.accent)}>Paprika {data.color}</h3>
                <span className="material-symbols-outlined text-stone-300">nutrition</span>
              </div>
              <p className="text-stone-600 text-sm font-sans italic mb-8">"{data.desc}"</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-stone-200/50">
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest font-sans">Kalori</span>
                  <span className="font-bold text-on-surface">{data.calories} kcal</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-stone-200/50">
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest font-sans">Vitamin C</span>
                  <span className="font-bold text-emerald-600">{data.vitC}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-stone-200/50">
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest font-sans">Vitamin A</span>
                  <span className="font-bold text-orange-600">{data.vitA}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-stone-200/50">
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest font-sans">Serat</span>
                  <span className="font-bold text-on-surface">{data.fiber}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Health Benefits Section */}
        <section className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-heading font-black text-on-surface tracking-tight">Manfaat Kesehatan Teruji</h2>
            <p className="text-stone-500 font-sans">Alasan mengapa paprika disebut sebagai salah satu superfood terbaik untuk tubuh Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-full py-20 text-center animate-pulse text-emerald-900/40 font-black uppercase tracking-widest">
                Menganalisis Profil Nutrisi...
              </div>
            ) : (nutrition.length > 0 ? nutrition : healthBenefitsFallback).map((benefit) => (
              <div key={benefit.title || benefit.name} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm flex gap-6 group hover:shadow-md transition-shadow">
                <div className={cn("w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center transition-transform group-hover:scale-110", benefit.bg_color || benefit.bg || "bg-emerald-50")}>
                  <span className={cn("material-symbols-outlined text-3xl", benefit.accent_color || benefit.color || "text-emerald-600")}>{benefit.icon || 'nutrition'}</span>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-on-surface tracking-tight">{benefit.name || benefit.title}</h4>
                  <p className="text-sm text-stone-500 leading-relaxed font-sans">{benefit.benefit || benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fact Sheet Table */}
        <section className="bg-white rounded-[2rem] p-10 border border-stone-100 shadow-sm overflow-hidden">
          <h3 className="text-2xl font-heading font-black text-on-surface mb-8 tracking-tight">Data Gizi Lengkap (per 100g)</h3>
          <div className="overflow-x-auto">
            <table className="w-full font-sans text-sm">
              <thead className="bg-stone-50">
                <tr className="text-left">
                  <th className="py-4 px-6 font-black text-[10px] uppercase tracking-widest text-stone-400">Parameter</th>
                  <th className="py-4 px-6 font-black text-[10px] uppercase tracking-widest text-stone-400">Paprika Merah</th>
                  <th className="py-4 px-6 font-black text-[10px] uppercase tracking-widest text-stone-400">Paprika Kuning</th>
                  <th className="py-4 px-6 font-black text-[10px] uppercase tracking-widest text-stone-400">Paprika Hijau</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-4 px-6 font-bold text-on-surface">Protein</td>
                  <td className="py-4 px-6">0.99g</td>
                  <td className="py-4 px-6">1.00g</td>
                  <td className="py-4 px-6">0.86g</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-on-surface">Lemak</td>
                  <td className="py-4 px-6">0.30g</td>
                  <td className="py-4 px-6">0.21g</td>
                  <td className="py-4 px-6">0.17g</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-on-surface">Karbohidrat</td>
                  <td className="py-4 px-6">6.03g</td>
                  <td className="py-4 px-6">6.32g</td>
                  <td className="py-4 px-6">4.64g</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-on-surface">Gula</td>
                  <td className="py-4 px-6">4.20g</td>
                  <td className="py-4 px-6">3.75g</td>
                  <td className="py-4 px-6">2.40g</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-on-surface">Potasium</td>
                  <td className="py-4 px-6">211mg</td>
                  <td className="py-4 px-6">212mg</td>
                  <td className="py-4 px-6">175mg</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 p-6 bg-emerald-50 rounded-2xl flex items-start gap-4">
            <span className="material-symbols-outlined text-emerald-600">info</span>
            <p className="text-[11px] text-emerald-800 leading-relaxed font-medium italic italic-custom">
               *Data gizi diambil berdasarkan rata-rata referensi nutrisi standar USDA. Nilai dapat sedikit bervariasi bergantung pada metode bercocok tanam dan kesegaran produk saat dikonsumsi.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-10">
           <Link href="/scan" className="inline-flex items-center gap-3 px-10 py-5 bg-on-surface text-surface font-black rounded-3xl hover:bg-on-surface-variant transition-colors shadow-2xl">
              Cek Kesehatan Tanaman Sekarang
              <span className="material-symbols-outlined">biotech</span>
           </Link>
        </section>

      </div>
    </div>
  )
}
