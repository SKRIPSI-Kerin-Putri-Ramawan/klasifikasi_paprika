import { cn } from "@/lib/utils"

const historicalComparisons = [
  { id: "#LAB-9921", date: "24 Okt 2023 · 14:22", type: "Bercak Bakteri", conf: "98.2%", status: "TERVERIFIKASI" },
  { id: "#LAB-9844", date: "12 Okt 2023 · 09:15", type: "Jaringan Sehat", conf: "99.7%", status: "TERVERIFIKASI" },
  { id: "#LAB-9701", date: "28 Sep 2023 · 16:45", type: "Hawar Awal", conf: "84.1%", status: "TINJAUN MANUAL" },
]

export default function ScanPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 bg-surface">
      {/* Header Section */}
      <header>
        <h2 className="text-4xl font-heading font-extrabold text-on-surface tracking-tight mb-2">Analisis Klasifikasi Daun</h2>
        <p className="text-on-surface-variant font-sans text-lg">Unggah spesimen botani resolusi tinggi untuk deteksi patogen deep-learning.</p>
      </header>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upload & Preview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-surface-container-low rounded-xl p-8 border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center min-h-[400px] text-center group cursor-pointer hover:bg-surface-container-high transition-colors">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-3xl">upload_file</span>
            </div>
            <h3 className="text-xl font-heading font-bold mb-2">Letakkan Gambar Spesimen</h3>
            <p className="text-on-surface-variant text-sm max-w-xs mb-6 font-sans">Mendukung format RAW, TIFF, dan JPEG. Pastikan daun berada di tengah dengan pencahayaan netral.</p>
            <button className="px-6 py-2 bg-surface-container-highest text-primary font-bold rounded-lg hover:bg-surface-variant transition-colors">
              Cari di Penyimpanan Lokal
            </button>
          </div>

          {/* Active Scan Preview */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-inner border border-surface-container">
            <div className="p-4 bg-surface-container-low flex justify-between items-center border-b border-surface-container">
              <span className="text-[10px] font-sans font-black tracking-widest text-on-surface-variant uppercase">Pratinjau Aktif: specimen_772.jpg</span>
              <div className="flex gap-2 items-center">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[10px] font-bold text-primary uppercase">PEMINDAIAN SEDANG BERLANGSUNG</span>
              </div>
            </div>
            <div className="relative aspect-video bg-stone-200">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA5lMOaSIrKBDcc-Q1o6Qk7s6EW0OEnEecWNtNhqTcKxi4-4X1XyL5GE5IB1PiBvDUY_h9fzQ6bkI0E65oUclanrb8IS9aT2Gc7aEJUq3cu42zxBM1d_FE57hbeWxFa7xWFbJ478b-emR2bINEGPcP-b6oB0AaUuutHOo0v4S1OGJ2M72jKnANy5J2rrcSRFxpgiWxe8fgo0CGhla3UtvRqoLD29YqQ7VO0GespEpDVs1gPuLb1toys-2NJ97UIx7rdDUUewIgcxM"
                alt="Active specimen preview"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-primary/40 rounded-xl relative">
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: CNN Analysis Results */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[10px] font-sans font-bold text-stone-500 uppercase tracking-widest mb-1">Hasil Diagnosis</p>
                <h4 className="text-3xl font-heading font-extrabold text-on-surface leading-tight">Bercak Bakteri</h4>
                <p className="text-emerald-700 font-medium text-sm mt-1 flex items-center gap-1 font-sans">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Deteksi Kepercayaan Tinggi
                </p>
              </div>
              <div className="bg-primary/10 px-4 py-2 rounded-lg text-center">
                <span className="block text-primary text-2xl font-black font-heading">98%</span>
                <span className="text-[9px] font-sans font-bold text-primary/70 uppercase">Skor CNN</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h5 className="text-[10px] font-sans font-black text-on-surface-variant mb-3 uppercase tracking-widest">Penilaian Gejala</h5>
                <div className="bg-surface-container-low p-4 rounded-lg border-l-4 border-primary">
                  <p className="text-sm text-on-surface leading-relaxed font-sans">
                    Teridentifikasi lesi nekrotik gelap basah yang dikelilingi halo klorotik. Pola menunjukkan perkembangan <span className="font-bold">Xanthomonas campestris</span>.
                  </p>
                </div>
              </div>

              <div>
                <h5 className="text-[10px] font-sans font-black text-on-surface-variant mb-3 uppercase tracking-widest">Rekomendasi Penanganan</h5>
                <ul className="space-y-3 font-sans">
                  {[
                    { title: "Bakterisida Berbasis Tembaga", desc: "Aplikasikan semprotan setiap 7-10 hari selama periode lembap." },
                    { title: "Irigasi Presisi", desc: "Beralih ke irigasi tetes untuk mencegah kelembapan pada daun." },
                    { title: "Protokol Sanitasi", desc: "Pangkas dedaunan yang terinfeksi dan sterilkan alat dengan Etanol 70%." }
                  ].map((treat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary text-sm">check</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{treat.title}</p>
                        <p className="text-xs text-on-surface-variant">{treat.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-surface-container text-sans text-9">
                <button className="w-full py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">description</span>
                  Buat Laporan Lab Lengkap
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-4 rounded-xl">
              <span className="material-symbols-outlined text-primary mb-2">thermostat</span>
              <span className="block text-[9px] font-sans font-bold text-stone-500 uppercase tracking-widest">Suhu Sekitar</span>
              <span className="text-lg font-bold font-heading">24.5°C</span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl">
              <span className="material-symbols-outlined text-primary mb-2">humidity_percentage</span>
              <span className="block text-[9px] font-sans font-bold text-stone-500 uppercase tracking-widest">Kelembapan</span>
              <span className="text-lg font-bold font-heading">62%</span>
            </div>
          </div>
        </div>

        {/* Historical Comparison */}
        <div className="lg:col-span-12 mt-4">
          <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h4 className="text-2xl font-heading font-bold text-on-surface tracking-tight">Perbandingan Patogen Historis</h4>
                <p className="text-on-surface-variant text-sm font-sans">Melacak tren analisis untuk kultivar <span className="italic font-medium">Capsicum annuum</span> selama musim saat ini.</p>
              </div>
              <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline font-sans">
                Ekspor Dataset <span className="material-symbols-outlined text-sm">download</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans">
                <thead>
                  <tr className="border-b border-outline-variant/20">
                    {["ID Analisis", "Waktu", "Klasifikasi", "Kepercayaan", "Status", "Aksi"].map((h) => (
                      <th key={h} className="pb-4 text-[10px] uppercase tracking-widest text-stone-500 font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {historicalComparisons.map((row) => (
                    <tr key={row.id} className="group hover:bg-surface-container-highest/50 transition-colors">
                      <td className="py-4 font-mono text-xs">{row.id}</td>
                      <td className="py-4 text-sm">{row.date}</td>
                      <td className="py-4">
                        <span className={cn(
                          "px-2 py-1 text-[10px] font-bold rounded",
                          row.type === "Jaringan Sehat" ? "bg-tertiary-container text-on-tertiary-container" : 
                          row.type === "Bercak Bakteri" ? "bg-error-container text-on-error-container" : "bg-amber-100 text-amber-800"
                        )}>
                          {row.type}
                        </span>
                      </td>
                      <td className="py-4 font-bold text-sm tracking-tighter">{row.conf}</td>
                      <td className="py-4">
                        <span className={cn(
                          "flex items-center gap-1 text-[10px] font-bold",
                          row.status === "TERVERIFIKASI" ? "text-primary" : "text-stone-400"
                        )}>
                          <span className="material-symbols-outlined text-[14px]">
                            {row.status === "TERVERIFIKASI" ? "check_circle" : "pending"}
                          </span>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-stone-400 group-hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
