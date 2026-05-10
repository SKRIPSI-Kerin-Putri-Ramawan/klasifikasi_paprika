"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const historyTimeline = [
  { year: "7000 SM", event: "Asal-Usul", desc: "Paprika liar pertama kali ditemukan di Amerika Tengah dan Selatan (Mesoamerika)." },
  { year: "1492", event: "Eksplorasi Dunia", desc: "Christopher Columbus membawa benih pertama ke Eropa, mengira itu adalah lada hitam (pepper)." },
  { year: "1600-an", event: "Penyebaran Global", desc: "Pelaut Portugis dan Spanyol membawa varietas Capsicum ke Asia, termasuk Nusantara." },
  { year: "Modern", event: "Era Pemulian", desc: "Pengembangan varietas hibrida unggul yang tahan penyakit dan memiliki warna beragam." },
]

export default function EncyclopediaPage() {
  const [diseases, setDiseases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDiseases() {
      const { data, error } = await supabase
        .from('diseases')
        .select('*')
      
      if (data) setDiseases(data)
      setLoading(false)
    }
    fetchDiseases()
  }, [])
  return (
    <div className="min-h-screen bg-surface pb-20">
      {/* Dynamic Header */}
      <div className="h-[60vh] relative flex items-center justify-center overflow-hidden">
        <video 
           autoPlay loop muted playsInline
           className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.3]"
           poster="/pepper-dashboard.png"
        >
          {/* Fallback image if no video */}
          <img src="/pepper-dashboard.png" alt="Pepper banner" className="w-full h-full object-cover" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/40 to-surface"></div>
        <div className="relative z-10 text-center space-y-4 px-6">
          <span className="px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-[0.4em] border border-white/30">
            Pusat Pengetahuan
          </span>
          <h1 className="text-6xl md:text-8xl font-heading font-black text-on-surface tracking-tighter leading-tight">
            Wawasan <br/>
            <span className="text-emerald-700 dark:text-emerald-400">Paprika</span>
          </h1>
          <p className="max-w-xl mx-auto text-on-surface-variant font-sans text-lg font-medium">
            Dari sejarah kuno hingga tantangan modern di tanah Serambi Mekkah.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 space-y-32 -mt-10 relative z-20">
        
        {/* Section: Sejarah */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3 sticky top-24">
              <h2 className="text-4xl font-heading font-black text-on-surface leading-tight">Jejak Langkah <br/>Sang Primadona</h2>
              <p className="text-on-surface-variant mt-4 font-sans italic italic-custom text-sm">"Perjalanan ribuan kilometer dari belahan bumi barat menuju meja makan kita."</p>
            </div>
            <div className="md:w-2/3 space-y-8">
              {historyTimeline.map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-emerald-600 border-4 border-surface shadow-sm"></div>
                    {idx < historyTimeline.length - 1 && <div className="w-[2px] h-full bg-emerald-100 dark:bg-emerald-900/40"></div>}
                  </div>
                  <div className="pb-10">
                    <span className="text-emerald-700 dark:text-emerald-400 font-black font-heading text-xl">{item.year}</span>
                    <h4 className="text-lg font-bold text-on-surface mb-2">{item.event}</h4>
                    <p className="text-on-surface-variant font-sans leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Budidaya & Aceh Context */}
        <section className="bg-emerald-900 rounded-[3rem] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
            <div className="space-y-8">
              <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-300">Studi Kasus Lokal</span>
              <h2 className="text-4xl md:text-5xl font-heading font-black leading-tight tracking-tight">
                Tantangan <br/>Tanah Aceh
              </h2>
              <p className="text-emerald-100/70 font-sans leading-relaxed text-lg">
                Aceh dikenal dengan iklimnya yang panas. Paprika, yang idealnya tumbuh pada suhu 21-27°C, seringkali mengalami "Heat Stress" di dataran rendah Aceh di mana suhu bisa melampaui 32°C.
              </p>
              <div className="space-y-4">
                 <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <h5 className="font-bold text-emerald-300 mb-2 flex items-center gap-2">
                       <span className="material-symbols-outlined text-sm">warning</span>
                       Penyebab Utama Kegagalan
                    </h5>
                    <p className="text-sm text-emerald-50/60 leading-relaxed">Kelembapan yang sangat fluktuatif di pesisir Aceh memicu serangan jamur jika terlalu tinggi, atau kerontokan bunga (Blossom Drop) jika terlalu kering.</p>
                 </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 space-y-8 border border-white/20">
               <h4 className="text-2xl font-heading font-bold">Solusi Cerdas</h4>
               <ul className="space-y-6">
                 <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-emerald-300">roofing</span>
                    </div>
                    <div>
                      <p className="font-bold text-emerald-50">Rumah Plastik UV</p>
                      <p className="text-xs text-emerald-100/50">Memfilter sinar matahari berlebih dan menjaga suhu konstan.</p>
                    </div>
                 </li>
                 <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-emerald-300">water_drop</span>
                    </div>
                    <div>
                      <p className="font-bold text-emerald-50">Water Fogging</p>
                      <p className="text-xs text-emerald-100/50">Sistem kabut air otomatis untuk menurunkan suhu mikro saat terik siang hari.</p>
                    </div>
                 </li>
                 <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-emerald-300">settings_input_composite</span>
                    </div>
                    <div>
                      <p className="font-bold text-emerald-50">Nutrisi Presisi</p>
                      <p className="text-xs text-emerald-100/50">Pemberian nutrisi AB Mix melalui sistem tetes (Drip Irrigation).</p>
                    </div>
                 </li>
               </ul>
            </div>
          </div>
        </section>

        {/* Section: Disease Knowledge */}
        <section className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-4xl font-heading font-black text-on-surface">Mengenali Musuh Tak Kasat Mata</h2>
            <p className="text-on-surface-variant font-sans">Ketahui jenis penyakit yang paling sering menyerang daun paprika Anda untuk penanganan dini.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full py-20 text-center animate-pulse text-emerald-900/40 font-black uppercase tracking-widest">
                Menghubungkan ke Pusat Pengetahuan...
              </div>
            ) : diseases.length > 0 ? (
              diseases.map((d) => (
                <div key={d.name} className="bg-card p-8 rounded-3xl border border-outline/5 shadow-sm hover:shadow-xl transition-all group flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-3xl">{d.icon || 'microbe'}</span>
                  </div>
                  <h4 className="text-lg font-bold text-on-surface mb-1">{d.name}</h4>
                  <p className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-4">{d.agent || d.scientific_name}</p>
                  <p className="text-sm text-on-surface-variant font-sans leading-relaxed">
                    {d.description || d.desc}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-stone-400 font-sans italic">
                Data penyakit belum tersedia.
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="pt-20 text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-[3rem] p-16 md:p-24 text-white relative overflow-hidden flex flex-col items-center">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
            <h3 className="text-4xl md:text-5xl font-heading font-black mb-6 relative z-10">Siap Menjaga Tanaman Anda?</h3>
            <p className="text-emerald-100 max-w-lg mb-10 text-lg font-medium relative z-10">Gunakan kecerdasan buatan PapriCare untuk mendeteksi kesehatan tanaman Anda dalam hitungan detik.</p>
            <Link 
              href="/scan" 
              className="px-12 py-5 bg-white text-emerald-900 font-black rounded-2xl hover:scale-105 transition-transform flex items-center gap-3 shadow-2xl relative z-10"
            >
              Mulai Analisis Deteksi
              <span className="material-symbols-outlined">biotech</span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
