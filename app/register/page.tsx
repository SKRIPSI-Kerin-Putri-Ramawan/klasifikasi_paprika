"use client"

import { useState } from "react"
import { createSupabaseClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createSupabaseClient()
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

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
                <span className="material-symbols-outlined text-primary text-2xl">science</span>
              </div>
              <span className="font-heading text-2xl font-black tracking-tighter text-on-primary-container">PhytoScan</span>
            </div>
            
            <div className="space-y-6">
              <span className="px-3 py-1 bg-emerald-900/40 text-emerald-100 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md border border-emerald-500/20">
                Pendaftaran Peneliti
              </span>
              <h1 className="font-heading text-5xl font-black text-on-primary-container leading-[1.1] tracking-tight">
                Bergabung dengan <span className="text-primary">Revolusi Agrikultur.</span>
              </h1>
              <p className="text-on-primary-container/70 text-lg leading-relaxed font-sans max-w-sm">
                Jadilah bagian dari peneliti yang menggunakan AI untuk klasifikasi kualitas buah paprika secara akurat.
              </p>
            </div>
          </div>
          
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-on-primary-container/5 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side: Register Form */}
        <div className="w-full flex items-center justify-center p-12 bg-surface">
          <div className="w-full max-w-sm space-y-10">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-3xl font-heading font-black text-on-surface tracking-tight">Daftar Akun Baru.</h3>
              <p className="text-on-surface-variant font-sans text-sm">Lengkapi data Anda untuk mengakses portal PhytoScan.</p>
            </div>

            <form className="space-y-6" onSubmit={handleRegister}>
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-100/10 rounded-xl border border-red-500/20">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-2 font-sans" htmlFor="fullname">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">badge</span>
                  <input
                    type="text"
                    id="fullname"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-xl py-3.5 pl-12 pr-4 text-on-surface placeholder:text-stone-400 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                    placeholder="Nama Lengkap Anda"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-2 font-sans" htmlFor="identity">
                  Identitas Portal (Email)
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">email</span>
                  <input
                    type="email"
                    id="identity"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-xl py-3.5 pl-12 pr-4 text-on-surface placeholder:text-stone-400 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                    placeholder="pakar@paprika.lab.id"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-2 font-sans" htmlFor="password">
                  Kunci Keamanan Baru
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">lock</span>
                  <input
                    type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-xl py-3.5 pl-12 pr-4 text-on-surface placeholder:text-stone-400 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-heading font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
              >
                {loading ? "Memproses..." : "Daftarkan Akses"}
                {!loading && <span className="material-symbols-outlined text-xl">arrow_forward</span>}
              </button>
            </form>

            <div className="pt-8 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/30"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-surface px-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest font-sans">Sudah Terdaftar?</span>
                </div>
              </div>

              <a 
                href="/login" 
                className="w-full py-4 rounded-xl border-2 border-primary/20 text-primary font-heading font-bold text-lg hover:bg-primary/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Masuk ke Portal
                <span className="material-symbols-outlined text-xl">login</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <div className="fixed bottom-8 left-8 hidden lg:block">
        <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.3em] font-sans">PhytoScan Platform Registrasi v4.2.1-Lab</p>
      </div>
    </div>
  )
}
