"use client"

import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center p-6 bg-[linear-gradient(135deg,rgba(248,250,249,0.92),rgba(242,244,243,0.85)),url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9H1x1notYvJxO4HGP9RW9AWUmmdaIK-b7nncu8ADIxsjWl2IVL-PBBiaRXUOGSmQIFhc8Ar43PGHpqEx07nBfy27ActOlFnc2RSyoN1c6jB7ioDm--Z668x3g0mhLgwzauK152TuS3DLK5uHBEwi57couiJAQbjQv2TvyvMsbvupO6bNQH05dZctEQfFeu0QAgr_N_UvvD7WNmFnvrd4riy_TYQbH6wxNzkWQzp_IBiwEWWpP8sCHs0ctHkf8Kt1ctrRIfEUs6JA')] bg-cover bg-center">
      <main className="w-full max-w-[1100px] grid md:grid-cols-2 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_40px_80px_-15px_rgba(25,28,28,0.08)] border border-outline-variant/20">
        
        {/* Left Side: Brand Narrative & Imagery */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-primary-container relative overflow-hidden">
          {/* Decorative Grain Texture */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-on-primary-container rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">biotech</span>
              </div>
              <span className="font-heading text-2xl font-black tracking-tighter text-on-primary-container">PhytoScan</span>
            </div>
            
            <div className="space-y-6">
              <span className="px-3 py-1 bg-emerald-900/40 text-emerald-100 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md border border-emerald-500/20">
                Teknologi Pertanian Masa Depan
              </span>
              <h1 className="font-heading text-5xl font-black text-on-primary-container leading-[1.1] tracking-tight">
                Transformasi Agrikultur Melalui <span className="text-primary">Visi Komputer.</span>
              </h1>
              <p className="text-on-primary-container/70 text-lg leading-relaxed font-sans max-w-sm">
                Identifikasi penyakit daun cabai dengan akurasi kelas laboratorium secara instan menggunakan AI.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-10">
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-on-primary-container/10">
              <div>
                <p className="text-2xl font-heading font-black text-on-primary-container">12rb+</p>
                <p className="text-[9px] uppercase tracking-widest text-on-primary-container/60 font-bold">Sampel Tervalidasi</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-black text-on-primary-container">99.4%</p>
                <p className="text-[9px] uppercase tracking-widest text-on-primary-container/60 font-bold">Akurasi Model</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-black text-on-primary-container">24</p>
                <p className="text-[9px] uppercase tracking-widest text-on-primary-container/60 font-bold">Spesies Terdaftar</p>
              </div>
            </div>

            <div className="bg-primary/20 backdrop-blur-md p-6 rounded-xl border border-on-primary-container/10">
              <p className="text-on-primary-container text-sm font-medium italic font-sans mb-4">
                "Integrasi AI ke dalam studi lapangan kami telah meningkatkan akurasi klasifikasi sebesar 42% pada kuartal ini."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-on-primary-container/30">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG--hHwX6ej3zDi-SDiUvA4TtOnVJNZflw-Yqai5zC0aFBgwWPzi32n5y2o9-Y1tCzNnPtaBFW-DQfAloQbgT7dJzgj_5xf9kJEs274g2ZWEhX__fjzM3WlVOi7QGQLMBS2w13YAHzV0fH46X1CW0R3tKFPAswMCCx6VXyso6j-8P20-5nvRQOYoOgLT3TAPlg_A8sDXphEwk_noBSoPzVMmOaZJSh_kZtFgko8qxUW6HFju5CXF7JQuutK23JHjQ1RZQxvcxfdJ4" alt="Dr Aris" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-primary-container uppercase tracking-wider font-sans">Dr. Elena Aris</p>
                  <p className="text-[10px] text-on-primary-container/60 font-medium font-sans">Patologis Utama</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-on-primary-container/5 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full flex items-center justify-center p-12 bg-surface">
          <div className="w-full max-w-sm space-y-10">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-3xl font-heading font-black text-on-surface tracking-tight">Selamat Datang.</h3>
              <p className="text-on-surface-variant font-sans text-sm">Masukkan kredensial Anda untuk mengakses dasbor lab.</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-2 font-sans" htmlFor="identity">
                  Identitas Portal
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">person</span>
                  <input
                    type="text"
                    id="identity"
                    className="w-full bg-surface-container-low border-none rounded-xl py-3.5 pl-12 pr-4 text-on-surface placeholder:text-stone-400 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                    placeholder="nama@lab.phyto.scan"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant font-sans" htmlFor="password">
                    Kunci Keamanan
                  </label>
                  <a href="#" className="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline font-sans">Lupa akses?</a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">lock</span>
                  <input
                    type="password"
                    id="password"
                    className="w-full bg-surface-container-low border-none rounded-xl py-3.5 pl-12 pr-4 text-on-surface placeholder:text-stone-400 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                    placeholder="••••••••"
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded text-primary focus:ring-primary/20 bg-surface-container-high border-none" />
                <label htmlFor="remember" className="ml-3 text-sm text-on-surface-variant font-sans">Tetap terotentikasi selama 24 jam</label>
              </div>

              <button
                type="button"
                className="w-full py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-heading font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                onClick={() => window.location.href = '/dashboard'}
              >
                Inisialisasi Sesi
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-surface px-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest font-sans">Akses Federasi</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-secondary-container transition-colors border border-transparent active:scale-[0.98]">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-wide font-sans">Google</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-secondary-container transition-colors border border-transparent active:scale-[0.98]">
                <span className="material-symbols-outlined text-lg">language</span>
                <span className="text-[10px] font-bold uppercase tracking-wide font-sans">SSO</span>
              </button>
            </div>
            
            <p className="mt-12 text-center text-xs text-on-surface-variant font-sans">
              Peneliti baru? 
              <a href="#" className="text-primary font-bold hover:underline ml-1">Ajukan Pendaftaran</a>
            </p>
          </div>
        </div>
      </main>
      
      <div className="fixed bottom-8 left-8 hidden lg:block">
        <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.3em] font-sans">PhytoScan Platform Analisis v4.2.1-Lab</p>
      </div>
    </div>
  )
}
