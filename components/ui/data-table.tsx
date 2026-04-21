"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="relative w-full max-w-sm group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-stone-400 text-xl group-focus-within:text-emerald-500 transition-colors">search</span>
          <input
            placeholder="Cari data..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-stone-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/50 shadow-sm transition-all"
          />
        </div>
      </div>
      <div className="rounded-2xl border border-stone-100 bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <Table>
          <TableHeader className="bg-stone-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-bold text-stone-700 py-4 uppercase text-[10px] tracking-widest">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-emerald-50/30 transition-colors border-stone-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 text-sm font-medium text-stone-600">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-40 text-center text-stone-400 font-medium font-sans">
                  Tidak ada data yang ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-6 px-2">
        <p className="text-xs font-bold text-stone-400">
          Menampilkan <span className="text-on-surface">halaman {table.getState().pagination.pageIndex + 1}</span> dari {table.getPageCount()}
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 font-bold transition-all disabled:opacity-30"
          >
            <span className="material-symbols-outlined text-sm mr-1">chevron_left</span>
            Sebelumnya
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: table.getPageCount() }).map((_, i) => (
              <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={cn(
                  "w-8 h-8 rounded-lg text-xs font-black transition-all",
                  table.getState().pagination.pageIndex === i 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                    : "text-stone-400 hover:bg-stone-50 hover:text-stone-600"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 font-bold transition-all disabled:opacity-30"
          >
            Selanjutnya
            <span className="material-symbols-outlined text-sm ml-1">chevron_right</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
