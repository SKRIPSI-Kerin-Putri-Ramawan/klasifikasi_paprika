import { cn } from "@/lib/utils"

const interventions = [
  {
    title: "Bercak Bakteri",
    scientific: "Xanthomonas campestris pv. vesicatoria",
    risk: "Risiko Kritis",
    riskColor: "bg-error",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOHCrUZRq3covxID1Jw72IilPFP5N0id4rTTCpP82HnUgohGv6MTxupmLl6M61T9GxRbwxIflicJxhlNBPT6Au4EG5V6MRUcvLjwo6n4i5zrDGn4PibrCzRlulfwD4tn-j01HO1lBzQ9nwTi3EVTTqdWcgpk8eI2wk3NS08sOxgO8-RmbvlrzT4LhMlHtCkWxE2U4377Mlkd9yg8esN2TA--wNyODgHQ5ssC40OeLE_okmgJyWjEcBuws9CbE4K7pkw0St5cAx274",
    success: 82,
    protocols: [
      { type: "Kimia", icon: "science", desc: "Bakterisida berbasis tembaga pada interval 14 hari. Rotasi Streptomisin direkomendasikan di zona non-resisten.", color: "text-primary" },
      { type: "Mekanis", icon: "content_cut", desc: "Pemangkasan dedaunan simtomatik di bawah 30% total biomassa. Pembakaran limbah terinfeksi diperlukan.", color: "text-secondary" },
      { type: "Lingkungan", icon: "thermostat", desc: "Pertahankan kelembapan (RH) < 75%. Hilangkan irigasi di atas kepala untuk mencegah penyebaran percikan bakteri.", color: "text-tertiary" },
    ]
  },
  {
    title: "Daun Mengeriting",
    scientific: "Taphrina deformans",
    risk: "Risiko Musiman",
    riskColor: "bg-secondary-fixed-dim text-on-secondary-fixed",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-nKMmj55NX7uBo-IFJ8shZI6zv_yagcdeVJGn5EV3RFW--7LRpQcYb6wbPLWjHbdD5fWTqKRmxS5gRTcl4SlWSenJqsaeIMGKJvRo4bJu9hgAgkL-SrpOc988TWn-qfwrRsz5BxsuplTyoZdqmNg6wcfV_P64VQIbnPZg-8hXJ5G6Jwvkkz_Xqzs5jv9wEdwaSp1qsSbrzv2IToAurldPHCAPhsUA394CIrBDBKf03mFcItJdPKAGyFaXfgZ1akbJfUJgsdR8bno",
    success: 94,
    protocols: [
      { type: "Kimia", icon: "science", desc: "Aplikasikan belerang-kapur atau klorotalonil selama fase dormansi akhir musim gugur sebelum kuncup pecah.", color: "text-primary" },
      { type: "Mekanis", icon: "content_cut", desc: "Penjarangan kanopi yang terlalu padat untuk meningkatkan aliran udara. Pembersihan daun-daun yang gugur di musim dingin.", color: "text-secondary" },
      { type: "Lingkungan", icon: "thermostat", desc: "Pelindung hujan untuk tanaman spesimen kecil selama periode musim semi yang basah. Pengaturan nitrogen tanah.", color: "text-tertiary" },
    ]
  }
]

export default function TreatmentPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 bg-surface">
      {/* Header Section */}
      <section>
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h1 className="text-5xl font-heading font-extrabold text-primary tracking-tight">Panduan Penanganan</h1>
            <p className="text-on-surface-variant font-sans max-w-2xl text-lg leading-relaxed">
              Protokol intervensi terverifikasi untuk manajemen patologi tanaman kelas klinis. Akses prosedur standar laboratorium untuk penanganan kimia, mekanis, dan lingkungan.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="bg-primary-container text-on-primary-container px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm font-filled">verified</span>
              Terverifikasi oleh Lab
            </span>
          </div>
        </div>
      </section>

      {/* Bento Grid Protocols */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start text-sans">
        <div className="xl:col-span-8 space-y-8">
          {interventions.map((item) => (
            <div key={item.title} className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/3 relative min-h-[256px]">
                  <img className="absolute inset-0 w-full h-full object-cover" src={item.img} alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded w-fit mb-2", item.riskColor)}>
                      {item.risk}
                    </span>
                    <h3 className="text-white text-2xl font-heading font-bold">{item.title}</h3>
                    <p className="text-stone-300 text-xs font-medium italic">{item.scientific}</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-8 flex flex-col justify-between">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-sans">
                    {item.protocols.map((proto) => (
                      <div key={proto.type} className="space-y-3">
                        <h4 className={cn("font-bold text-[10px] uppercase tracking-widest flex items-center gap-2", proto.color)}>
                          <span className="material-symbols-outlined text-sm">{proto.icon}</span>
                          {proto.type}
                        </h4>
                        <p className="text-on-surface-variant text-sm leading-snug">{proto.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-outline-variant/20 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-black text-stone-400">Tingkat Keberhasilan</span>
                        <span className="text-lg font-bold text-primary">{item.success}%</span>
                      </div>
                      <div className="w-16 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${item.success}%` }}></div>
                      </div>
                    </div>
                    <button className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
                      Lihat Protokol Detail
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Info */}
        <div className="xl:col-span-4 space-y-8">
          <div className="bg-surface-container-highest p-8 rounded-xl">
            <h4 className="font-heading font-bold text-xl text-on-surface mb-6">Integritas Protokol</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-primary-container/20 p-3 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sans">biotech</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Metode Teruji Lab</p>
                  <p className="text-xs text-on-surface-variant">Semua penanganan diverifikasi oleh fasilitas ISO-17025.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-secondary-container/20 p-3 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">update</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Pembaruan Mingguan</p>
                  <p className="text-xs text-on-surface-variant">Protokol diperbarui setiap 7 hari berdasarkan pelacakan mutasi.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
            <h4 className="font-heading font-bold text-lg text-on-surface mb-4">Patogen Baru Muncul</h4>
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border-l-4 border-error shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black uppercase text-error">Ancaman Baru</span>
                  <span className="text-[10px] text-stone-400">2 j yang lalu</span>
                </div>
                <p className="text-sm font-bold text-on-surface mb-1">Fusarium Wilt Varian B</p>
                <p className="text-xs text-on-surface-variant">Penyebaran cepat terdeteksi di Zona 4. Tinjau protokol 4.2B.</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border-l-4 border-secondary shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-black uppercase text-secondary">Peringatan Mutasi</span>
                  <span className="text-[10px] text-stone-400">6 j yang lalu</span>
                </div>
                <p className="text-sm font-bold text-on-surface mb-1">Downy Mildew</p>
                <p className="text-xs text-on-surface-variant">Teramati adanya resistensi terhadap fungisida Grup 40.</p>
              </div>
            </div>
            <button className="w-full mt-6 py-3 border border-outline-variant/30 text-[10px] font-black uppercase tracking-widest text-on-surface-variant rounded-lg hover:bg-surface-container-highest transition-colors">
              Semua Peringatan Global
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden group h-64">
            <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxhcrCHNmWZz2lmC4h0QU1gvyFymhFKUbxA4lyxdOS56MTUAHNGeksgZR74vLrQlbBP2bK-bQ6bgnp_KeV3omS8zE8LsHAiTM_Xh490_qv0l9gGNDBg8b-TEdXkYw36f77jTePEOTFaIPKkZGzZBiwelZG6xNv1-zgZqyP34DGjffIp3FZ_-id9iIXT3zg9xHNqkPmxNrbaDstemStcw8-omhWWo18DWJLX81T-QVUnegdejeLQI2dneI1fGXllwqfwA3sNDBCVXY" alt="Lab Sandbox" />
            <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center p-8 text-center text-white">
              <span className="material-symbols-outlined text-5xl mb-4">analytics</span>
              <h4 className="text-xl font-heading font-bold mb-2">Sandbox Analisis</h4>
              <p className="text-emerald-100 text-sm mb-6">Simulasikan tingkat keberhasilan intervensi berdasarkan data mikroklimat lokal Anda.</p>
              <button className="bg-white text-primary px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-transform">Luncurkan Simulator</button>
            </div>
          </div>
        </div>
      </div>

      <footer className="pt-12 pb-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center opacity-60">
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
          <span>Status Sistem: Nominal</span>
          <span>Versi: 2.4.0-Lab</span>
        </div>
        <div className="flex items-center gap-8 mt-4 md:mt-0 text-[10px] font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-primary">Metodologi</a>
          <a href="#" className="hover:text-primary">Panduan Etika</a>
          <a href="#" className="hover:text-primary">Hubungi Keamanan Biologi</a>
        </div>
      </footer>
    </div>
  )
}
