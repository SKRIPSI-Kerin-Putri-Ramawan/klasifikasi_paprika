"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn("w-10 h-10 rounded-xl bg-stone-100 animate-pulse", className)} />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative p-2.5 rounded-xl transition-all duration-300 ease-in-out",
        "bg-stone-50 hover:bg-stone-100 border border-stone-100 shadow-sm",
        "dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800",
        className
      )}
      title={isDark ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <span 
          className={cn(
            "material-symbols-outlined absolute transition-all duration-500 transform text-[20px]",
            isDark 
              ? "translate-y-0 opacity-100 rotate-0 text-yellow-400" 
              : "translate-y-10 opacity-0 rotate-90"
          )}
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
        >
          light_mode
        </span>
        <span 
          className={cn(
            "material-symbols-outlined absolute transition-all duration-500 transform text-[20px]",
            !isDark 
              ? "translate-y-0 opacity-100 rotate-0 text-indigo-600" 
              : "-translate-y-10 opacity-0 -rotate-90"
          )}
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
        >
          dark_mode
        </span>
      </div>
      
      {/* Subtle glow effect on hover */}
      <div className={cn(
        "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none",
        isDark ? "bg-yellow-400 blur-md" : "bg-indigo-400 blur-md"
      )} />
    </button>
  )
}
