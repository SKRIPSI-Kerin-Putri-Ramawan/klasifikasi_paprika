"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { createSupabaseClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export function AdminHeader() {
  const supabase = createSupabaseClient()
  const router = useRouter()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .single()
        
        if (profile?.avatar_url) {
          setAvatarUrl(profile.avatar_url)
        }
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <header className={cn(
      "w-full sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl flex justify-between items-center px-10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-stone-100",
      "h-[76px]"
    )}>
      <div className="flex items-center gap-6">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-500 transition-colors">
            search
          </span>
          <input
            type="text"
            className="pl-12 pr-4 py-2.5 bg-stone-50 hover:bg-stone-100 border border-transparent focus:border-emerald-200 rounded-xl text-sm w-72 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-stone-700 placeholder:text-stone-400 font-medium"
            placeholder="Cari data admin..."
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-rose-50 border border-rose-100 rounded-full shadow-sm">
          <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]"></span>
          <span className="text-[10px] font-black text-rose-800 uppercase tracking-widest">
            Admin Mode
          </span>
        </div>
        
        <div className="flex items-center gap-3 pl-6 border-l border-stone-200">
          <button onClick={handleLogout} className="p-2.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" title="Keluar Mode Admin">
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
          <div className="h-10 w-10 mt-0.5 rounded-full overflow-hidden border-2 border-stone-200 ml-2 shadow-sm hover:border-emerald-400 transition-colors cursor-pointer bg-stone-100 flex items-center justify-center">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profil Admin"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-stone-400">person</span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
