"use client"

import { cn } from "@/lib/utils"

export function Header() {
  return (
    <header className={cn(
      "w-full sticky top-0 z-40 bg-stone-50/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center px-8 py-3 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.05)]",
      "h-16"
    )}>
      <div className="flex items-center gap-6">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
            search
          </span>
          <input
            type="text"
            className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/20"
            placeholder="Cari data eksperimen..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-highest rounded-full">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
            Sistem Aktif
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 text-stone-500 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-stone-500 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-primary/20 ml-2">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj2HncUJHwC4ISY1gkFnf6HnuBz9u4Ip5j_EmrS8RSpRtMDlQ8TGXZxBHPm4rGSSnBSmcCPrUCRqaIx8EkBIIj2pyfxW6dLDHTEuP1j-tTtYI52R8wJm6Ry3P5bI27Uwvrz4ztS1wa5N39XNccwvPoK5gGj3TETR0Jwz4bPIuPAjE9ZB1cOqgFeGPyCePslLc8PDY8tatxKAn-Rv8x3kD2TywD1F43cfxsblZ5dAS48Z2IcIkewdtckv4WaG9Ov09ojSNqZolAzOw"
              alt="Profil Peneliti"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
