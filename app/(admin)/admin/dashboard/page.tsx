"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    classifications: 0,
    mostDetected: "N/A"
  })
  const [recentClassifications, setRecentClassifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      // Fetch total users
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
      
      // Fetch total classifications
      const { count: classificationCount } = await supabase
        .from('classifications')
        .select('*', { count: 'exact', head: true })

      // Fetch recent activity
      const { data: recent } = await supabase
        .from('classifications')
        .select('*, profiles(email)')
        .order('created_at', { ascending: false })
        .limit(5)

      setStats({
        users: userCount || 0,
        classifications: classificationCount || 0,
        mostDetected: "Bercak Daun" // This would ideally be a query, but keeping for now
      })
      setRecentClassifications(recent || [])
      setLoading(false)
    }
    fetchStats()
  }, [])

  return (
    <div className="space-y-12 pb-10">
      <header>
        <h2 className="text-4xl font-heading font-black text-on-surface tracking-tight">Executive Dashboard</h2>
        <p className="text-on-surface-variant font-medium mt-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live monitoring platform PhytoScan.
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Metrics */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm flex flex-col justify-between min-h-[200px] group hover:shadow-xl hover:shadow-emerald-900/5 transition-all">
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-2xl">group</span>
              </div>
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">Active Members</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-1">Total Peneliti</p>
              <p className="text-5xl font-heading font-black text-on-surface">
                {loading ? "..." : stats.users.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm flex flex-col justify-between min-h-[200px] group hover:shadow-xl hover:shadow-emerald-900/5 transition-all">
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-2xl">biotech</span>
              </div>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">Successful Scans</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-1">Total Klasifikasi</p>
              <p className="text-5xl font-heading font-black text-on-surface">
                {loading ? "..." : stats.classifications.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="md:col-span-2 bg-emerald-900 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[120px] text-white">analytics</span>
            </div>
            <div className="relative z-10 space-y-6">
              <p className="text-emerald-300 text-[10px] font-black uppercase tracking-[0.3em]">Insights Terkini</p>
              <h3 className="text-3xl font-heading font-black text-white leading-tight max-w-md">
                Penyakit <span className="text-emerald-400 italic">Bercak Daun</span> mendominasi 64% laporan minggu ini.
              </h3>
              <div className="flex gap-4">
                <Link href="/admin/history" className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-xl text-white text-[10px] font-black uppercase tracking-widest transition-all">
                  Lihat Detail Analitik
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-low rounded-[2rem] p-8 border border-stone-100 flex flex-col min-h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-heading font-black text-on-surface tracking-tight uppercase">Aktivitas Terbaru</h3>
              <Link href="/admin/history" className="text-[10px] font-black text-emerald-600 hover:underline tracking-widest">SEMUA</Link>
            </div>

            <div className="space-y-6 flex-grow">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <div key={i} className="h-16 bg-stone-100 animate-pulse rounded-2xl" />)}
                </div>
              ) : recentClassifications.length > 0 ? (
                recentClassifications.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-4 group">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      item.result === 'Sehat' ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                    )}>
                      <span className="material-symbols-outlined text-xl">
                        {item.result === 'Sehat' ? 'check_circle' : 'warning'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black text-on-surface truncate">{item.result}</p>
                      <p className="text-[10px] text-stone-400 font-bold truncate">
                        {item.profiles?.email || 'User'} • {new Date(item.created_at).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-10 opacity-40">
                  <span className="material-symbols-outlined text-4xl mb-2 text-stone-400">history</span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Belum ada aktivitas</p>
                </div>
              )}
            </div>

            <div className="mt-10 pt-8 border-t border-stone-200/60">
              <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm space-y-4">
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">shield</span>
                  Status Sistem
                </p>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant font-bold">Infrastruktur</span>
                  <span className="text-emerald-600 font-black">Optimal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
