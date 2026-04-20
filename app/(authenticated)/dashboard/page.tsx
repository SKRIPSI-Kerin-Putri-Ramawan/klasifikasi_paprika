import { cn } from "@/lib/utils"

const stats = [
  {
    label: "Akurasi Model",
    value: "96.5%",
    trend: "+1.2%",
    icon: "model_training",
    color: "text-primary",
  },
  {
    label: "Ukuran Dataset",
    value: "2,500",
    trend: "Sampel",
    icon: "database",
    color: "text-on-surface",
  },
  {
    label: "Jenis Penyakit",
    value: "4",
    trend: "Terklasifikasi",
    icon: "bug_report",
    color: "text-tertiary",
  },
]

const logs = [
  {
    id: "#LAB-9921",
    name: "Tomato Early Blight",
    species: "Solanum lycopersicum",
    timestamp: "24 Okt 2023 • 14:22",
    status: "DITINJAU",
    statusColor: "bg-tertiary-container text-on-tertiary-container",
  },
  {
    id: "#LAB-9844",
    name: "Pepper Bell Healthy",
    species: "Capsicum annuum",
    timestamp: "24 Okt 2023 • 12:45",
    status: "DIARSIPKAN",
    statusColor: "bg-secondary-container text-on-secondary-container",
  },
]

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8 bg-surface">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-heading font-bold text-on-surface tracking-tight">Ringkasan Lab</h2>
          <p className="text-on-surface-variant font-sans">Metrik analisis deep learning dan status neural engine.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-secondary-container text-on-secondary-container font-semibold rounded-xl hover:opacity-90 transition-opacity">
            Ekspor Laporan
          </button>
          <button className="px-4 py-2 bg-primary text-on-primary font-semibold rounded-xl hover:opacity-90 transition-opacity">
            Rekalibrasi Mesin
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface-container-low p-8 rounded-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-9xl">
                {stat.icon}
              </span>
            </div>
            <p className="text-[10px] font-sans font-bold text-on-surface-variant tracking-[0.1em] uppercase mb-4">
              {stat.label}
            </p>
            <div className="flex items-baseline gap-2">
              <span className={cn("text-4xl font-heading font-extrabold tracking-tighter", stat.color)}>
                {stat.value}
              </span>
              <span className={cn(
                "text-sm font-bold flex items-center",
                stat.label === "Akurasi Model" ? "text-emerald-600" : "text-stone-500"
              )}>
                {stat.label === "Akurasi Model" && (
                  <span className="material-symbols-outlined text-sm">arrow_upward</span>
                )}
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Main Content Info */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Botanical & Disease Insights */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">potted_plant</span>
              <h3 className="text-2xl font-heading font-bold text-on-surface tracking-tight">Wawasan Botani: Paprika</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-[10px] font-sans font-bold text-primary uppercase tracking-[0.2em]">Profil Tanaman</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  <span className="font-bold italic text-on-surface">Capsicum annuum</span> adalah spesies dari famili Solanaceae. Tanaman ini memiliki struktur perdu yang kompak, ideal untuk sistem pertanian presisi. Pertumbuhannya sangat dipengaruhi oleh intensitas cahaya dan kualitas nutrisi tanah.
                </p>
                <div className="flex gap-4">
                  <div className="px-3 py-1 bg-primary/10 rounded-full text-[9px] font-bold text-primary uppercase">Herbaceous</div>
                  <div className="px-3 py-1 bg-secondary/10 rounded-full text-[9px] font-bold text-secondary uppercase">Perennial</div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-sans font-bold text-primary uppercase tracking-[0.2em]">Analisis Daun</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Daun paprika yang sehat memiliki tekstur halus dengan warna hijau emerald yang pekat. Permukaan daun (kutikula) berfungsi sebagai penghalang utama terhadap patogen. Perubahan warna atau bercak pada area ini adalah indikator awal stres tanaman.
                </p>
                <ul className="text-[10px] font-bold text-stone-500 space-y-1">
                  <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-emerald-500"></span> MARGIN: ENTIRE (HALUS)</li>
                  <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-emerald-500"></span> VENASI: PINNATE</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-error text-3xl">microbe</span>
                <h3 className="text-2xl font-heading font-bold text-on-surface tracking-tight">Ensiklopedia Penyakit</h3>
              </div>
              <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Lihat Semua Katalog</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { name: "Bercak Bakteri", agent: "Xanthomonas", color: "bg-amber-500" },
                { name: "Hawar Daun", agent: "Alternaria", color: "bg-error" },
                { name: "Virus Mosaik", agent: "TMV", color: "bg-tertiary" },
              ].map((item) => (
                <div key={item.name} className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5 hover:shadow-md transition-shadow">
                  <div className={`w-8 h-1 ${item.color} rounded-full mb-3`}></div>
                  <h5 className="font-bold text-sm text-on-surface mb-1">{item.name}</h5>
                  <p className="text-[10px] italic text-stone-500">{item.agent}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Scan Card */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xl font-heading font-bold text-on-surface tracking-tight px-2">Pemindaian Terbaru</h3>
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm ring-1 ring-black/[0.05]">
            <div className="aspect-video relative group">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0M7_2r_RPFKlBUY0A2FYlmYvhqSoNGQTm44EhzklwguyETtE63rbkjziJEiVf1CgbU8s_-x3bUAZK7oP1smBKrEqa59hx-EePHh7YXDuc8wA0_zfJnQ99HaqJw2ex7ORk4qKmWXFdFym2Qm7wcgKDEkSFFF5ZRVXA7uaQHwanm1qGYqk1jZ5N-O8fY0ZjPVfR4ZRzS3Vs2Sn-Hb0_mJNOuvxHo6TzfzW6cuveND33xmzguobg3wrE17OMGQzWCLOQCte9ZtPWOWM"
                alt="Daun cabai berpenyakit"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-bold uppercase tracking-widest">Sampel Resolusi Tinggi #882</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-heading text-lg font-bold text-on-surface leading-tight">Bercak Bakteri</h4>
                  <p className="text-[10px] font-sans text-stone-500 uppercase tracking-widest mt-1">Capsicum annuum</p>
                </div>
                <div className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-[10px] font-black">
                  98% KEPERCAYAAN
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-surface-container-high rounded-lg">
                  <span className="material-symbols-outlined text-error">warning</span>
                  <div className="text-[10px]">
                    <p className="font-bold text-on-surface">Penanganan Mendesak Diperlukan</p>
                    <p className="text-stone-500">Probabilitas penyebaran: Tinggi</p>
                  </div>
                </div>
                <button className="w-full py-3 bg-surface-container-highest text-on-surface-variant font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
                  Lihat Analisis Lengkap
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classification Logs */}
      <section className="max-w-6xl mx-auto">
        <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-heading font-bold text-on-surface tracking-tight">Log Klasifikasi</h3>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">filter_list</span>
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">download</span>
            </div>
          </div>
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="grid grid-cols-12 gap-4 items-center p-4 bg-surface-container-lowest rounded-xl hover:shadow-md transition-shadow">
                <div className="col-span-1">
                  <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-800">
                    <span className="material-symbols-outlined">eco</span>
                  </div>
                </div>
                <div className="col-span-4">
                  <p className="text-sm font-bold text-on-surface">{log.name}</p>
                  <p className="text-xs text-stone-500">{log.species}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Waktu</p>
                  <p className="text-xs text-stone-500">{log.timestamp}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Status</p>
                  <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full", log.statusColor)}>
                    {log.status}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                  <button className="text-primary text-xs font-bold hover:underline">Detail</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
