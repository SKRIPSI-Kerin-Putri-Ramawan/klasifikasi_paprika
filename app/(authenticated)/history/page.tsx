import { cn } from "@/lib/utils"

const logs = [
  { id: "#LAB-9921", name: "Hawar Awal Tomat", species: "Solanum lycopersicum", timestamp: "24 Okt 2023 • 14:22", status: "DITINJAU", statusColor: "bg-tertiary-container text-on-tertiary-container", confidence: "98.2%" },
  { id: "#LAB-9844", name: "Cabai Paprika Sehat", species: "Capsicum annuum", timestamp: "24 Okt 2023 • 12:45", status: "DIARSIPKAN", statusColor: "bg-secondary-container text-on-secondary-container", confidence: "99.7%" },
  { id: "#LAB-9701", name: "Bercak Bakteri", species: "Capsicum annuum", timestamp: "24 Okt 2023 • 09:12", status: "PENDING", statusColor: "bg-error-container text-on-error-container", confidence: "92.1%" },
]

export default function HistoryPage() {
  return (
    <div className="p-8 space-y-8 bg-surface">
      <header className="max-w-6xl mx-auto flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-heading font-bold text-on-surface tracking-tight">Riwayat Klasifikasi</h2>
          <p className="text-on-surface-variant font-sans">Arsip lengkap dari semua log analisis spesimen botani.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-surface-container-highest text-on-surface-variant font-semibold rounded-xl hover:opacity-90 transition-all border border-outline-variant/30 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter
          </button>
          <button className="px-4 py-2 bg-primary text-on-primary font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">download</span>
            Ekspor Semua
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto">
        <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10">
          <table className="w-full text-left font-sans">
            <thead className="bg-surface-container-high">
              <tr>
                {["ID", "Klasifikasi", "Spesies", "Waktu", "Kepercayaan", "Status", "Aksi"].map((h) => (
                  <th key={h} className="px-6 py-4 text-[10px] uppercase tracking-widest text-stone-500 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 bg-surface-container-lowest">
              {logs.map((log) => (
                <tr key={log.id} className="group hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{log.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-on-surface">{log.name}</p>
                  </td>
                  <td className="px-6 py-4 text-xs italic text-stone-500">{log.species}</td>
                  <td className="px-6 py-4 text-xs text-stone-500">{log.timestamp}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-primary">{log.confidence}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-3 py-1 text-[10px] font-bold rounded-full", log.statusColor)}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-stone-400 group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
