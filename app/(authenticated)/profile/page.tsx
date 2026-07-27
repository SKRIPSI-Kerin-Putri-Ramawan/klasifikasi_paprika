"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { createSupabaseClient } from "@/utils/supabase/client"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { useRouter } from "next/navigation"

interface UserProfile {
  full_name: string
  avatar_url: string
}

interface Classification {
  id: string
  result: string
  confidence: number
  species: string
  status: string
  created_at: string
}

interface Stats {
  label: string
  value: number
  color: string
  text: string
  icon: string
}

export default function ProfilePage() {
  const supabase = createSupabaseClient()
  const router = useRouter()
  
  // Modal & Password State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null)
  const [passwordLoading, setPasswordLoading] = useState(false)

  const [profileImage, setProfileImage] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuDOJgc7KknXztXxlcsTTyRJMPp2mF_S0DLAWPFylVXUO3AJjcjNk3B6zE9qDsYur7C1kBiBtoa9kT1msRVal9fACZG1Smw1_0NBwEpoomCWo4B2qhF_I1BUZyMclSGyCcLQvls32PYac6NXr0musmnw4fXpkN59UtzKj1cwKSTOcPk-9Sb4I6zux1M6sAUdL-BGj94aaucPPSH1QUpUe9hCWgO5zAcMZS17kwZccZn2yH1nDr3vp67OINV3tYtiBM4yVjhaISLVe58")
  const [userData, setUserData] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<Stats[]>([])
  const [recentActivity, setRecentActivity] = useState<Classification[]>([])
  const [totalAnalisis, setTotalAnalisis] = useState(0)
  const [avgAccuracy, setAvgAccuracy] = useState(0)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push("/login")
      router.refresh()
    } catch (error: any) {
      console.error("Error logging out:", error)
      alert("Gagal keluar akun: " + error.message)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError(null)
    setPasswordSuccess(null)

    if (!newPassword || !confirmPassword) {
      setPasswordError("Semua bidang sandi harus diisi.")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Sandi baru dan konfirmasi sandi tidak cocok.")
      return
    }

    if (newPassword.length < 6) {
      setPasswordError("Sandi minimal harus terdiri dari 6 karakter.")
      return
    }

    setPasswordLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error

      setPasswordSuccess("Kata sandi berhasil diperbarui!")
      setNewPassword("")
      setConfirmPassword("")
      
      // Auto close modal after 1.5s
      setTimeout(() => {
        setIsPasswordModalOpen(false)
        setPasswordSuccess(null)
      }, 1500)
    } catch (error: any) {
      console.error("Error changing password:", error)
      setPasswordError(error.message || "Gagal mengubah kata sandi.")
    } finally {
      setPasswordLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      // 1. Get User
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()
        
        if (profile) {
          setUserData(profile)
          if (profile.avatar_url) setProfileImage(profile.avatar_url)
        }
      }

      // 2. Get Classifications for Stats
      const { data: allClassifications } = await supabase
        .from("classifications")
        .select("result, confidence")

      if (allClassifications) {
        const total = allClassifications.length
        setTotalAnalisis(total)

        const healthy = allClassifications.filter(c => c.result.toLowerCase() === "sehat").length
        const bacteria = allClassifications.filter(c => c.result.toLowerCase() === "bercak bakteri").length
        const others = total - healthy - bacteria

        // Calculate average accuracy
        const avg = total > 0 
          ? allClassifications.reduce((acc, curr) => acc + (curr.confidence || 0), 0) / total 
          : 0
        setAvgAccuracy(avg)

        setStats([
          { label: "Tanaman Sehat", value: healthy, color: "bg-emerald-500", text: "text-emerald-700", icon: "potted_plant" },
          { label: "Bercak Bakteri", value: bacteria, color: "bg-amber-500", text: "text-amber-700", icon: "bug_report" },
          { label: "Lainnya", value: others, color: "bg-rose-500", text: "text-rose-700", icon: "warning" },
        ])
      }

      // 3. Get Recent Activity
      const { data: recent } = await supabase
        .from("classifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3)
      
      if (recent) {
        setRecentActivity(recent)
      }

    } catch (error) {
      console.error("Error fetching profile data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 1. Validation
    if (!file.type.startsWith("image/")) {
      alert("Hanya file gambar yang diperbolehkan.")
      return
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      alert("Ukuran file terlalu besar. Maksimal 2MB.")
      return
    }

    setUploading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      // 2. Upload to Storage
      // We use a timestamped filename to avoid caching issues and comply with RLS folder structure
      const fileExt = file.name.split(".").pop()
      const filePath = `public/${user.id}/avatar-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 3. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath)

      // 4. Update Profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id)

      if (profileError) throw profileError

      // 5. Update local state
      setProfileImage(publicUrl)
      if (userData) {
        setUserData({ ...userData, avatar_url: publicUrl })
      }

    } catch (error: any) {
      console.error("Error uploading image:", error)
      alert(`Gagal mengunggah gambar: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-primary font-bold animate-pulse text-sm">Menyinkronkan Data Laboratorium...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-12 max-w-7xl mx-auto space-y-12 bg-surface relative">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Uploading Overlay */}
      {uploading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-surface p-8 rounded-2xl flex flex-col items-center gap-4 shadow-2xl border border-primary/20">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-primary font-bold animate-pulse text-sm">Mengunggah Foto Profil...</p>
          </div>
        </div>
      )}

      <header>
        <h2 className="text-4xl font-heading font-extrabold tracking-tight text-on-surface mb-2">Profil Peneliti</h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-sans">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-low rounded-xl p-8 relative overflow-hidden group border border-outline-variant/10 shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="relative mb-6">
                <img 
                  className="w-32 h-32 rounded-xl object-cover shadow-2xl ring-4 ring-surface" 
                  src={profileImage}
                  alt={userData?.full_name || "Kerin Putri"}
                />

              </div>
              <h3 className="text-2xl font-heading font-bold text-on-surface mb-1">{userData?.full_name || "Kerin Putri"}</h3>
              <p className="text-primary font-bold text-sm mb-6 px-4 py-1 bg-primary/10 rounded-full capitalize">Peneliti</p>
              
              <div className="w-full grid grid-cols-2 gap-4 border-t border-outline-variant/10 pt-6 mt-2">
                <div className="text-center border-r border-outline-variant/10">
                  <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1">Status</p>
                  <p className="font-heading font-bold text-on-surface tracking-tight">Terverifikasi</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1">Fokus</p>
                  <div className="flex flex-col items-center">
                    <p className="font-heading font-bold text-on-surface tracking-tight">Paprika</p>
                    <p className="text-[9px] italic text-primary/70 font-sans tracking-wide leading-none mt-0.5">Capsicum annuum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 font-sans">
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full flex items-center justify-between p-4 bg-card/50 backdrop-blur-md rounded-xl group hover:bg-primary hover:text-white transition-all duration-300 border border-outline-variant/10 shadow-sm disabled:opacity-50"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors">upload</span>
                <span className="font-bold text-sm">Ganti Foto Profil</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant/40 group-hover:translate-x-1 group-hover:text-white transition-all">arrow_forward</span>
            </button>
            <button 
              onClick={() => setIsPasswordModalOpen(true)}
              className="w-full flex items-center justify-between p-4 bg-card/50 backdrop-blur-md rounded-xl group hover:bg-secondary hover:text-white transition-all duration-300 border border-outline-variant/10 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary group-hover:text-white transition-colors">lock_reset</span>
                <span className="font-bold text-sm">Ubah Kata Sandi</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant/40 group-hover:translate-x-1 group-hover:text-white transition-all">arrow_forward</span>
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 bg-error-container/5 rounded-xl group hover:bg-error hover:text-white transition-all duration-300 border border-error/10 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-error group-hover:text-white transition-colors">logout</span>
                <span className="font-bold text-sm text-error group-hover:text-white transition-colors">Keluar Akun</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Stats & Activity */}
        <div className="lg:col-span-8 space-y-8 font-sans">
          {/* Classification Stats */}
          <section className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-heading font-bold tracking-tight">Statistik Klasifikasi</h3>
                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-1 opacity-60">Ringkasan Diagnosis Daun</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase">Sinkron Bi-directional Aktif</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className={cn("p-3 w-fit rounded-lg mb-4 text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3", stat.color)}>
                    <span className="material-symbols-outlined">{stat.icon}</span>
                  </div>
                  <h4 className="text-3xl font-heading font-black text-on-surface mb-1">{stat.value.toLocaleString()}</h4>
                  <p className={cn("text-[10px] font-bold uppercase tracking-widest", stat.text)}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Scientific Summary Bento */}
            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-primary/5 rounded-xl p-5 flex flex-col items-center justify-center border border-primary/10 group hover:bg-primary/10 transition-colors">
                  <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1 opacity-70">Total Analisis</p>
                  <p className="text-3xl font-heading font-black text-on-surface">{totalAnalisis}</p>
               </div>
               <div className="bg-emerald-500/5 rounded-xl p-5 flex flex-col items-center justify-center border border-emerald-500/10 group hover:bg-emerald-500/10 transition-colors">
                  <p className="text-[10px] font-black uppercase text-emerald-700 tracking-widest mb-1 opacity-70">Akurasi Rata-rata</p>
                  <p className="text-3xl font-heading font-black text-on-surface">{(avgAccuracy * 100).toFixed(1)}%</p>
               </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="mt-8 space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                <span>Rasio Kesehatan Tanaman</span>
                <span>{stats.length > 0 && stats[0].value > 0 ? ((stats[0].value / stats.reduce((acc, s) => acc + s.value, 0)) * 100).toFixed(1) : 0}% Populasi</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
                <div className="h-full bg-emerald-500" style={{ width: `${stats.length > 0 ? (stats[0].value / stats.reduce((acc, s) => acc + s.value, 0)) * 100 : 0}%` }}></div>
                <div className="h-full bg-amber-500" style={{ width: `${stats.length > 1 ? (stats[1].value / stats.reduce((acc, s) => acc + s.value, 0)) * 100 : 0}%` }}></div>
                <div className="h-full bg-rose-500" style={{ width: `${stats.length > 2 ? (stats[2].value / stats.reduce((acc, s) => acc + s.value, 0)) * 100 : 0}%` }}></div>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-heading font-bold tracking-tight">Aktivitas Terbaru</h3>
                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-1 opacity-60">Riwayat Scan Terakhir</p>
              </div>
              <button className="text-[10px] font-bold text-primary hover:underline transition-all uppercase tracking-widest">Lihat Semua</button>
            </div>

            <div className="space-y-4">
              {recentActivity.length > 0 ? recentActivity.map((activity, idx) => (
                <div key={idx} className="bg-surface-container-lowest p-5 rounded-lg flex items-center justify-between border border-outline-variant/5 hover:border-primary/20 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      activity.result.toLowerCase() === "sehat" ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400" : "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400"
                    )}>
                      <span className="material-symbols-outlined">
                        {activity.result.toLowerCase() === "sehat" ? "check_circle" : "error"}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">{activity.result}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-on-surface-variant italic">{activity.species}</span>
                        <span className="h-1 w-1 bg-outline-variant/30 rounded-full"></span>
                        <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase">{(activity.confidence * 100).toFixed(1)}% Confidence</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase mb-1">{format(new Date(activity.created_at), "d MMMM, HH:mm", { locale: id })}</p>
                    <span className={cn(
                      "text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-tighter",
                      activity.status === "COMPLETED" ? "bg-emerald-500 text-white" : "bg-primary text-white"
                    )}>
                      {activity.status === "COMPLETED" ? "Terverifikasi" : activity.status}
                    </span>
                  </div>
                </div>
              )) : (
                <div className="text-center py-12 bg-surface-container-lowest rounded-lg border-2 border-dashed border-outline-variant/10">
                   <p className="text-sm text-on-surface-variant italic font-sans">Belum ada riwayat klasifikasi.</p>
                </div>
              )}
            </div>
          </section>


        </div>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-surface-container-low border border-outline-variant/10 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => {
                setIsPasswordModalOpen(false)
                setPasswordError(null)
                setPasswordSuccess(null)
                setNewPassword("")
                setConfirmPassword("")
              }}
              className="absolute top-6 right-6 text-stone-400 hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-heading font-bold text-on-surface tracking-tight">Ubah Kata Sandi</h3>
                <p className="text-xs text-on-surface-variant font-sans">Masukkan kata sandi baru Anda di bawah ini.</p>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                {passwordError && (
                  <div className="p-3 text-xs text-red-500 bg-red-100/10 rounded-xl border border-red-500/20 font-sans">
                    {passwordError}
                  </div>
                )}

                {passwordSuccess && (
                  <div className="p-3 text-xs text-emerald-500 bg-emerald-100/10 rounded-xl border border-emerald-500/20 font-sans">
                    {passwordSuccess}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant font-sans" htmlFor="new-password">
                    Kata Sandi Baru
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">lock</span>
                    <input
                      type="password"
                      id="new-password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-xl py-3.5 pl-12 pr-4 text-on-surface placeholder:text-stone-400 focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                      placeholder="Minimal 6 karakter"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant font-sans" htmlFor="confirm-password">
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">lock_reset</span>
                    <input
                      type="password"
                      id="confirm-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-xl py-3.5 pl-12 pr-4 text-on-surface placeholder:text-stone-400 focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                      placeholder="Ulangi kata sandi baru"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPasswordModalOpen(false)
                      setPasswordError(null)
                      setPasswordSuccess(null)
                      setNewPassword("")
                      setConfirmPassword("")
                    }}
                    className="flex-1 py-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-sm rounded-xl transition-all font-sans"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="flex-1 py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/10 hover:bg-primary/95 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 font-sans"
                  >
                    {passwordLoading ? "Menyimpan..." : "Simpan Sandi"}
                    {!passwordLoading && <span className="material-symbols-outlined text-base">save</span>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
