import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-b border-emerald-900/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
              <span className="material-symbols-outlined text-white text-2xl">psychiatry</span>
            </div>
            <div>
              <h1 className="text-xl font-heading font-black text-emerald-950 flex items-center gap-1">
                Phyto<span className="text-emerald-600">Scan</span>
              </h1>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-800/60 -mt-1">
                Klasifikasi Paprika
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Fitur</Link>
            <Link href="#how-it-works" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Cara Kerja</Link>
            <Link href="/encyclopedia" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Ensiklopedi</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="px-5 py-2 text-sm font-bold text-emerald-900 border border-emerald-900/10 rounded-xl hover:bg-emerald-50 transition-colors">
              Masuk
            </Link>
            <Link href="/register" className="px-5 py-2 text-sm font-bold bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95">
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 animate-in fade-in slide-in-from-left duration-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">
                Teknologi AI Terbaru
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-heading font-black text-emerald-950 leading-[1.1] tracking-tight">
              Cerdas Mengidentifikasi, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Tepat Menangani
              </span> <br />
              Paprika Anda.
            </h1>
            
            <p className="text-lg text-emerald-900/60 font-sans leading-relaxed max-w-xl">
              Solusi cerdas untuk deteksi dini penyakit tanaman paprika. Optimalkan hasil panen Anda dengan analisis akurat berbasis kecerdasan buatan.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/dashboard" className="px-8 py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-2xl shadow-emerald-600/30 hover:bg-emerald-700 transition-all active:scale-95 flex items-center gap-3">
                Mulai Sekarang Gratis
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link href="/scan" className="px-8 py-4 bg-white text-emerald-900 font-black rounded-2xl shadow-xl shadow-black/5 hover:bg-emerald-50 transition-all flex items-center gap-3 border border-emerald-900/5">
                Coba Demo Scan
                <span className="material-symbols-outlined">camera</span>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-8">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-emerald-100 overflow-hidden flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">person</span>
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-emerald-900/40">
                Bergabung dengan <span className="text-emerald-900">500+ Petani</span> lainnya
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full"></div>
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/50 backdrop-blur-sm group">
              <img 
                src="/landing-hero.png" 
                alt="Premium Paprika" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent"></div>
              
              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-600 text-3xl">verified</span>
                </div>
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Akurasi Deteksi</p>
                  <p className="text-2xl font-black text-emerald-950 leading-none mt-1">98.4%</p>
                  <p className="text-[10px] text-emerald-900/40 font-bold mt-1">Berbasis 10k+ Dataset Daun</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-emerald-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.3em]">Fitur Unggulan</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-black text-emerald-950">Semua yang Anda Butuhkan <br /> Untuk Tanaman Anda</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Klasifikasi AI", desc: "Identifikasi jenis penyakit melalui foto daun secara instan dengan akurasi tinggi.", icon: "shutter_speed", color: "bg-red-50 text-red-600" },
              { title: "Ensiklopedi Digital", desc: "Database lengkap mengenai berbagai penyakit, gejala, dan cara pencegahan.", icon: "auto_stories", color: "bg-emerald-50 text-emerald-600" },
              { title: "Riwayat Analisis", desc: "Simpan dan pantau riwayat kesehatan tanaman Anda secara terperinci.", icon: "history", color: "bg-blue-50 text-blue-600" },
              { title: "Saran Penanganan", desc: "Rekomendasi perawatan yang tepat berdasarkan diagnosa hasil klasifikasi AI.", icon: "medication", color: "bg-amber-50 text-amber-600" }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-white rounded-[2rem] border border-emerald-900/5 shadow-xl shadow-emerald-900/5 hover:translate-y-[-8px] transition-all group">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", feature.color)}>
                  <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                </div>
                <h4 className="text-xl font-heading font-black text-emerald-950 mb-4">{feature.title}</h4>
                <p className="text-sm text-emerald-900/60 leading-relaxed font-sans">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square bg-emerald-100 rounded-[2rem] overflow-hidden flex items-center justify-center">
                     <span className="material-symbols-outlined text-emerald-300 text-7xl">photo_camera</span>
                  </div>
                  <div className="aspect-[3/4] bg-emerald-800 rounded-[2rem] overflow-hidden p-8 flex flex-col justify-between text-white">
                     <span className="material-symbols-outlined text-4xl">analytics</span>
                     <div>
                       <p className="text-2xl font-black">Proses AI</p>
                       <p className="text-xs text-white/60 mt-2">Dianalisis secara real-time</p>
                     </div>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="aspect-[3/4] bg-emerald-50 rounded-[2rem] border border-emerald-100 p-8 flex flex-col justify-between text-emerald-950">
                     <span className="material-symbols-outlined text-emerald-600 text-4xl">assignment_turned_in</span>
                     <div>
                       <p className="text-2xl font-black">Laporan</p>
                       <p className="text-xs text-emerald-900/40 mt-2">Dapatkan hasil diagnosa</p>
                     </div>
                  </div>
                  <div className="aspect-square bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white">
                     <span className="material-symbols-outlined text-6xl">garden</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                 <h2 className="text-sm font-black text-emerald-600 uppercase tracking-[0.3em]">Langkah Mudah</h2>
                 <h3 className="text-4xl md:text-5xl font-heading font-black text-emerald-950 leading-tight">3 Langkah Menggunakan <br /> PhytoScan</h3>
              </div>

              <div className="space-y-8">
                {[
                  { step: "01", title: "Ambil Foto", desc: "Arahkan kamera ke daun paprika yang bermasalah atau unggah foto dari galeri." },
                  { step: "02", title: "Tunggu Analisis", desc: "Sistem cerdas kami akan memproses gambar dalam hitungan detik untuk mengenali gejala." },
                  { step: "03", title: "Dapatkan Solusi", desc: "Lihat hasil klasifikasi beserta rekomendasi penanganan yang sesuai untuk tanaman Anda." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <span className="text-3xl font-heading font-black text-emerald-100 group-hover:text-emerald-300 transition-colors">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-heading font-black text-emerald-950 mb-2">{item.title}</h4>
                      <p className="text-sm text-emerald-900/60 leading-relaxed font-sans">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/scan" className="inline-flex px-8 py-4 bg-emerald-950 text-white font-black rounded-2xl hover:bg-emerald-900 transition-all flex items-center gap-3">
                Coba Sekarang
                <span className="material-symbols-outlined">camera_enhance</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-950 text-3xl">psychiatry</span>
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-black">PhytoScan</h1>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Powered by Advanced AI</p>
                </div>
              </div>
              <p className="text-white/60 text-sm max-w-sm leading-relaxed font-sans">
                Pendamping terbaik bagi petani paprika modern untuk menjaga kesehatan tanaman dan memastikan hasil panen yang melimpah.
              </p>
            </div>
            
            <div className="space-y-6">
              <h5 className="text-xs font-black uppercase tracking-widest text-emerald-400">Navigasi</h5>
              <ul className="space-y-3 text-sm text-white/60 font-bold">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/scan" className="hover:text-white transition-colors">Scan AI</Link></li>
                <li><Link href="/encyclopedia" className="hover:text-white transition-colors">Ensiklopedi</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="text-xs font-black uppercase tracking-widest text-emerald-400">Kontak Kami</h5>
              <ul className="space-y-3 text-sm text-white/60 font-medium">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">mail</span>
                  hello@phytoscan.ai
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  Bogor, Jawa Barat
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">
              © 2026 PhytoScan. All rights Reserved.
            </p>
            <div className="flex gap-6 text-[10px] font-black text-white/20 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
