"use client"

import { useEffect, useState } from "react"
import { createSupabaseClient } from "@/utils/supabase/client"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils"

type Classification = {
  id: string
  created_at: string
  result: string
  confidence: number
  status: string
  image_url: string
  profiles?: { full_name: string } | null
}

export default function AdminHistoryPage() {
  const [data, setData] = useState<Classification[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  const handleDelete = async (id: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data klasifikasi ini? Tindakan ini tidak dapat dibatalkan.")) return

    try {
      const { error } = await supabase
        .from("classifications")
        .delete()
        .eq("id", id)
      
      if (error) throw error
      setData(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.error("Error deleting record:", error)
      alert("Gagal menghapus data.")
    }
  }

  const columns: ColumnDef<Classification>[] = [
    {
      accessorKey: "created_at",
      header: "Waktu",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"))
        return (
          <div className="flex flex-col">
            <span className="text-sm font-bold text-on-surface">
              {date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <span className="text-[10px] text-stone-400 font-medium">
              {date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "image_url",
      header: "Specimen",
      cell: ({ row }) => (
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-100 shadow-sm">
          <img 
            src={row.getValue("image_url")} 
            alt="Specimen" 
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      id: "user",
      header: "Peneliti",
      cell: ({ row }) => {
        const profile = row.original.profiles
        return (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-[14px] text-emerald-700">person</span>
            </div>
            <span className="text-sm font-medium text-stone-600">
              {profile?.full_name || "Sistem / Anonim"}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "result",
      header: "Identifikasi",
      cell: ({ row }) => (
        <div className="font-black text-on-surface flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            row.getValue("result") === 'Sehat' ? "bg-emerald-500" : "bg-red-500"
          )} />
          {row.getValue("result")}
        </div>
      ),
    },
    {
      accessorKey: "confidence",
      header: "Akurasi",
      cell: ({ row }) => {
        const conf = parseFloat(row.getValue("confidence"))
        return (
          <div className="flex flex-col gap-1">
            <div className="text-[11px] text-stone-700 font-black font-mono tracking-tighter">
              {(conf * 100).toFixed(1)}%
            </div>
            <div className="w-16 h-1 bg-stone-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all" 
                style={{ width: `${conf * 100}%` }}
              />
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <span className={cn(
            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
            status === 'VERIFIED' 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-100/50' 
              : 'bg-amber-50 text-amber-700 border-amber-100/50'
          )}>
            {status}
          </span>
        )
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleDelete(row.original.id)}
            className="p-2 bg-stone-50 text-stone-400 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all group"
            title="Hapus Data"
          >
            <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">delete</span>
          </button>
        </div>
      ),
    },
  ]

  useEffect(() => {
    async function fetchHistory() {
      const { data: records, error } = await supabase
        .from('classifications')
        .select('*, profiles(full_name)')
        .order('created_at', { ascending: false })
      
      if (records) {
        setData(records as Classification[])
      }
      setLoading(false)
    }
    fetchHistory()
  }, [])

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-heading font-black text-on-surface tracking-tight">Database Klasifikasi</h2>
          <p className="text-on-surface-variant font-medium mt-2">Log lengkap seluruh aktivitas identifikasi spesimen PhytoScan.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-black rounded-xl border border-emerald-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">database</span>
            Total: {data.length} Record
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center p-20">
          <div className="w-10 h-10 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin"></div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </div>
  )
}
