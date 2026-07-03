"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { createSupabaseClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createSupabaseClient()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!email.trim()) {
      setError("Login gagal: Email wajib diisi.")
      setLoading(false)
      return
    }
    if (!password) {
      setError("Login gagal: Kata sandi wajib diisi.")
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      const msg = error.message.toLowerCase()
      let friendlyMessage = `Login gagal: ${error.message}`

      if (msg.includes("invalid login credentials") || msg.includes("invalid credentials")) {
        friendlyMessage = "Login gagal: Email tidak terdaftar atau kata sandi salah."
      } else if (msg.includes("email not confirmed") || msg.includes("email not verified")) {
        friendlyMessage = "Login gagal: Email belum terverifikasi. Silakan periksa kotak masuk email Anda."
      } else if (msg.includes("invalid email")) {
        friendlyMessage = "Login gagal: Format email tidak valid."
      } else if (msg.includes("too many requests") || msg.includes("rate limit")) {
        friendlyMessage = "Login gagal: Terlalu banyak percobaan masuk. Silakan coba beberapa saat lagi."
      }

      setError(friendlyMessage)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }


  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center p-6 bg-[linear-gradient(135deg,rgba(248,250,249,0.92),rgba(242,244,243,0.85)),url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9H1x1notYvJxO4HGP9RW9AWUmmdaIK-b7nncu8ADIxsjWl2IVL-PBBiaRXUOGSmQIFhc8Ar43PGHpqEx07nBfy27ActOlFnc2RSyoN1c6jB7ioDm--Z668x3g0mhLgwzauK152TuS3DLK5uHBEwi57couiJAQbjQv2TvyvMsbvupO6bNQH05dZctEQfFeu0QAgr_N_UvvD7WNmFnvrd4riy_TYQbH6wxNzkWQzp_IBiwEWWpP8sCHs0ctHkf8Kt1ctrRIfEUs6JA')] bg-cover bg-center" suppressHydrationWarning>
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
              <span className="font-heading text-2xl font-black tracking-tighter text-on-primary-container">PapriCare</span>
            </div>
            
            <div className="space-y-6">
              <span className="px-3 py-1 bg-emerald-900/40 text-emerald-100 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md border border-emerald-500/20">
                Teknologi Pertanian Masa Depan
              </span>
              <h1 className="font-heading text-5xl font-black text-on-primary-container leading-[1.1] tracking-tight">
                Transformasi Agrikultur Melalui <span className="text-primary">Visi Komputer.</span>
              </h1>
              <p className="text-on-primary-container/70 text-lg leading-relaxed font-sans max-w-sm">
                Identifikasi kualitas dan jenis penyakit daun paprika dengan akurasi kelas laboratorium secara instan.
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-10">
            <div className="grid grid-cols-2 gap-6 pt-10 border-t border-on-primary-container/10">
              <div>
                <p className="text-2xl font-heading font-black text-on-primary-container">Deteksi Cepat</p>
                <p className="text-[9px] uppercase tracking-widest text-on-primary-container/60 font-bold">Identifikasi penyakit daun dalam hitungan detik</p>
              </div>
              <div>
                <p className="text-2xl font-heading font-black text-on-primary-container">Akurasi Klasifikasi</p>
                <p className="text-[9px] uppercase tracking-widest text-on-primary-container/60 font-bold">Prediksi penyakit menggunakan model CNN</p>
              </div>
            </div>

            <div className="bg-primary/20 backdrop-blur-md p-6 rounded-xl border border-on-primary-container/10">
              <p className="text-on-primary-container text-sm font-medium italic font-sans leading-relaxed">
                "Membantu petani dalam mengidentifikasi patogen pada tanaman paprika secara dini untuk hasil panen yang lebih optimal dan berkualitas."
              </p>
            </div>
          </div>
          
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-on-primary-container/5 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full flex items-center justify-center p-12 bg-surface">
          <div className="w-full max-w-sm space-y-10">
            <div className="space-y-4 text-center">
              <div className="mx-auto w-12 h-1.5 bg-primary rounded-full mb-2"></div>
              <h3 className="text-4xl font-heading font-black text-on-surface tracking-tight">Selamat Datang.</h3>
              <p className="text-on-surface-variant font-sans text-[10px] uppercase tracking-[0.2em] font-black opacity-60">Portal Analisis Penyakit Paprika</p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-100/10 rounded-xl border border-red-500/20">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-2 font-sans" htmlFor="identity">
                  Username
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">person</span>
                  <input
                    type="email"
                    id="identity"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-xl py-3.5 pl-12 pr-4 text-on-surface placeholder:text-stone-400 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                    placeholder="masukkan email"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant font-sans" htmlFor="password">
                    kata sandi
                  </label>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">lock</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-xl py-3.5 pl-12 pr-12 text-on-surface placeholder:text-stone-400 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors focus:outline-none flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-heading font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
              >
                {loading ? "Memuat..." : "Inisialisasi Sesi"}
                {!loading && <span className="material-symbols-outlined text-xl">arrow_forward</span>}
              </button>
            </form>

            <div className="pt-8 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/30"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-surface px-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest font-sans">Belum Punya Akses?</span>
                </div>
              </div>

              <Link 
                href="/register" 
                className="w-full py-4 rounded-xl border-2 border-primary/20 text-primary font-heading font-bold text-lg hover:bg-primary/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                Daftar Akun Baru
                <span className="material-symbols-outlined text-xl">person_add</span>
              </Link>
            </div>

            
          </div>
        </div>
      </main>
      
      <div className="fixed bottom-8 left-8 hidden lg:block">
        <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-[0.3em] font-sans">PapriCare Platform Analisis v4.2.1-Lab</p>
      </div>
    </div>
  )
}
