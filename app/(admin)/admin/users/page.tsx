"use client"

import { useEffect, useState } from "react"
import { createSupabaseClient } from "@/utils/supabase/client"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"

type Profile = {
  id: string
  full_name: string | null
  role: string | null
}

const columns: ColumnDef<Profile>[] = [
  {
    accessorKey: "id",
    header: "ID Pengguna",
    cell: ({ row }) => <div className="text-[10px] text-stone-400 font-mono truncate max-w-[150px] uppercase font-bold tracking-tight">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "full_name",
    header: "Nama Lengkap",
    cell: ({ row }) => <div className="font-bold text-on-surface">{row.getValue("full_name") || "Tanpa Nama"}</div>,
  },
  {
    accessorKey: "role",
    header: "Peran Akses",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          role === 'admin' 
            ? 'bg-rose-50 text-rose-700 border border-rose-100' 
            : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
        }`}>
          {role === 'admin' ? 'Administrator' : 'Peneliti'}
        </span>
      )
    },
  },
]

export default function AdminUsersPage() {
  const [data, setData] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    async function fetchUsers() {
      const { data: profiles, error } = await supabase.from('profiles').select('*').order('role', { ascending: true })
      if (profiles) {
        setData(profiles)
      }
      setLoading(false)
    }
    fetchUsers()
  }, [])

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-heading font-black text-on-surface tracking-tight">Manajemen Pengguna</h2>
        <p className="text-on-surface-variant font-medium mt-2">Daftar semua pengguna terdaftar di platform PhytoScan.</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  )
}
