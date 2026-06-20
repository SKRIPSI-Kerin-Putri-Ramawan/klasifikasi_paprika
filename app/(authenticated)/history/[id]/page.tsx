"use client"

import { useEffect, useState, use } from "react"
import { createSupabaseClient } from "@/utils/supabase/client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

const isHealthyResult = (result?: string) => {
  if (!result) return false;
  const r = result.toLowerCase();
  return r === 'healthy' || r === 'sehat' || r.includes('daun sehat');
}

const getDiseaseDetails = (result?: string) => {
  const r = (result || '').toLowerCase();
  
  if (r.includes('bacterial') || r.includes('bakteri')) {
    return {
      name: "Bacterial Spot",
      description: "Bacterial Spot merupakan penyakit pada daun paprika yang disebabkan oleh bakteri Xanthomonas campestris pv. vesicatoria. Penyakit ini ditandai dengan munculnya bercak kecil berwarna cokelat kehitaman pada daun. Jika tidak ditangani, daun dapat menguning, mengering, dan akhirnya gugur sehingga pertumbuhan tanaman terganggu.",
      details: {
        whatIs: "Bacterial Spot adalah penyakit yang menyerang daun, batang, dan buah tanaman paprika. Penyakit ini disebabkan oleh bakteri bernama Xanthomonas campestris pv. vesicatoria, yaitu mikroorganisme sangat kecil yang tidak dapat dilihat dengan mata telanjang dan dapat menyebar melalui air hujan, percikan air, alat pertanian, atau benih yang terinfeksi.",
        howAttacks: "Bakteri masuk ke jaringan tanaman melalui luka kecil atau pori-pori alami pada daun. Setelah masuk, bakteri berkembang biak dan merusak sel-sel daun sehingga muncul bercak berwarna cokelat kehitaman.",
        symptoms: [
          "Bercak kecil berwarna cokelat atau hitam pada daun.",
          "Daun berubah menjadi kuning.",
          "Daun mengering dan mudah gugur.",
          "Pada serangan berat, pertumbuhan tanaman menjadi terhambat."
        ],
        transmission: [
          "Kelembapan yang tinggi.",
          "Air hujan atau percikan air saat penyiraman.",
          "Benih yang sudah terinfeksi.",
          "Peralatan pertanian yang tidak bersih."
        ],
        impact: "Jika tidak segera ditangani, penyakit ini dapat mengurangi kualitas dan hasil panen paprika karena daun yang rusak tidak mampu melakukan fotosintesis secara optimal."
      }
    };
  }
  
  if (r.includes('cercospora')) {
    return {
      name: "Cercospora Leaf Spot (Bercak Daun Cercospora)",
      description: "Cercospora Leaf Spot merupakan penyakit bercak daun pada paprika yang disebabkan oleh jamur Cercospora capsici. Penyakit ini memicu timbulnya bercak berbentuk bulat dengan pusat berwarna abu-abu terang dan pinggiran cokelat gelap. Jika dibiarkan, infeksi jamur ini dapat merusak sebagian besar area daun dan menyebabkan kerontokan parah.",
      details: {
        whatIs: "Cercospora Leaf Spot (Bercak Daun Cercospora) adalah penyakit infeksi jamur yang menyerang daun tanaman paprika, disebabkan oleh patogen jamur Cercospora capsici. Jamur ini berkembang biak melalui spora mikro yang mudah terbawa angin atau percikan air.",
        howAttacks: "Spora jamur menempel pada permukaan daun yang basah, lalu berkecambah dan menembus dinding sel daun. Miselia jamur tumbuh di dalam jaringan daun, menyerap nutrisi dari sel tanaman dan membunuh sel-sel tersebut, menghasilkan bercak berbentuk melingkar.",
        symptoms: [
          "Bercak bulat berdiameter 1-5 mm dengan pusat abu-abu/putih dikelilingi lingkaran cokelat tua.",
          "Daun di sekitar bercak perlahan menguning.",
          "Daun rontok (defoliasi) dimulai dari bagian bawah tanaman.",
          "Tajuk tanaman menjadi gundul pada serangan yang sangat parah."
        ],
        transmission: [
          "Suhu hangat disertai dengan kelembapan udara yang sangat tinggi.",
          "Aliran udara di sekitar tanaman yang buruk karena jarak tanam terlalu rapat.",
          "Daun basah terlalu lama akibat penyiraman malam hari atau embun."
        ],
        impact: "Kerontokan daun yang parah akibat infeksi jamur ini menurunkan kemampuan fotosintesis tanaman secara drastis, sehingga buah paprika yang dihasilkan berukuran kecil, tidak berkualitas, bahkan gagal panen."
      }
    };
  }
  
  return {
    name: "Sehat (Healthy)",
    description: "Daun paprika Anda diidentifikasi berada dalam kondisi sehat (Healthy). Tidak ada indikasi serangan infeksi bakteri Xanthomonas maupun jamur Cercospora. Pertahankan kebersihan area budidaya serta penyiraman dan pemupukan yang konsisten.",
    details: {
      whatIs: "Kondisi sehat menunjukkan bahwa tanaman paprika Anda tumbuh secara optimal tanpa adanya serangan patogen aktif. Daun memiliki klorofil yang baik, permukaan yang bersih dari bercak nekrotik, dan integritas sel yang kuat untuk mendukung proses fotosintesis.",
      howAttacks: "Tanaman yang sehat didukung oleh sistem imun tanaman yang kuat, kecukupan hara makro/mikro, serta lingkungan mikro yang ideal (suhu, kelembapan, sirkulasi udara) yang mencegah spora jamur berkecambah atau bakteri berkembang biak.",
      symptoms: [
        "Permukaan daun bersih, berwarna hijau segar, dan rata tanpa bercak.",
        "Tulang daun tampak kokoh dan elastis.",
        "Tidak ada gejala menguning (klorosis) yang tidak normal.",
        "Pertumbuhan tunas baru berjalan stabil."
      ],
      transmission: [
        "Asupan nutrisi NPK, Magnesium, dan Kalsium yang tercukupi dengan baik.",
        "Sirkulasi udara yang baik sehingga permukaan daun cepat mengering setelah terkena air.",
        "Sanitasi lahan yang terjaga dari gulma dan hama pembawa virus/bakteri."
      ],
      impact: "Tanaman yang sehat menghasilkan proses fotosintesis yang sangat efisien, mempercepat pembungaan, meningkatkan bobot buah paprika, dan memastikan produktivitas hasil panen berada di tingkat terbaik."
    }
  };
};

const getRecommendations = (result?: string) => {
  const r = (result || '').toLowerCase();
  
  if (r.includes('bacterial') || r.includes('bakteri')) {
    return [
      { emoji: "🌿", title: "Isolasi Tanaman yang Terinfeksi", desc: "Pisahkan tanaman yang menunjukkan gejala bercak bakteri dari tanaman yang sehat. Langkah ini bertujuan untuk mengurangi risiko penyebaran penyakit ke tanaman lain, terutama pada kondisi lingkungan yang lembap." },
      { emoji: "✂", title: "Pangkas dan Buang Daun yang Terserang", desc: "Daun yang sudah menunjukkan bercak sebaiknya dipangkas dan dibuang dari area budidaya. Hindari membuang bagian tanaman yang terinfeksi di sekitar lahan karena dapat menjadi sumber penyebaran penyakit." },
      { emoji: "💧", title: "Atur Pola Penyiraman", desc: "Lakukan penyiraman secukupnya dan usahakan tidak membasahi permukaan daun secara berlebihan. Penyiraman pada pagi hari lebih disarankan agar kelembapan berlebih dapat berkurang selama siang hari." },
      { emoji: "🌱", title: "Jaga Keseimbangan Nutrisi Tanaman", desc: "Berikan pupuk sesuai kebutuhan tanaman agar pertumbuhan tetap optimal. Tanaman dengan kondisi nutrisi yang baik umumnya lebih mampu bertahan terhadap serangan penyakit." },
      { emoji: "🔍", title: "Lakukan Pemantauan Secara Berkala", desc: "Periksa kondisi daun dan bagian tanaman lainnya secara rutin. Jika ditemukan gejala yang semakin meluas, segera lakukan penanganan lebih lanjut untuk mencegah kerusakan yang lebih parah." },
      { emoji: "🧹", title: "Jaga Kebersihan Area Budidaya", desc: "Bersihkan gulma, sisa daun kering, dan bagian tanaman yang membusuk di sekitar area tanam. Lingkungan yang bersih dapat membantu mengurangi perkembangan bakteri penyebab penyakit." },
      { emoji: "⚠", title: "Segera Lakukan Penanganan", desc: "Apabila gejala bercak semakin banyak dan menyebar ke daun lainnya, disarankan untuk segera melakukan penanganan lebih lanjut sesuai dengan praktik budidaya yang dianjurkan agar produktivitas tanaman tetap terjaga." }
    ];
  }
  
  if (r.includes('cercospora')) {
    return [
      { emoji: "💨", title: "Perbaiki Sirkulasi Udara", desc: "Atur jarak tanam antar paprika dengan baik agar aliran udara lancar dan kelembapan di sekitar tajuk tanaman tidak terlalu tinggi." },
      { emoji: "✂", title: "Pangkas Daun yang Sakit", desc: "Potong daun yang terinfeksi jamur Cercospora dan segera musnahkan jauh dari area kebun agar spora jamur tidak menyebar tertiup angin." },
      { emoji: "💧", title: "Hindari Kelembapan Tinggi", desc: "Kurangi kelembapan dengan menyiram langsung ke tanah di sekitar akar (irigasi tetes) dan hindari menyiram daun di sore/malam hari." },
      { emoji: "🧹", title: "Bersihkan Sisa Tanaman (Sanitasi)", desc: "Bersihkan sisa daun yang gugur dari tanah karena spora jamur Cercospora dapat bertahan hidup di sisa tanaman tersebut selama musim ekstrem." },
      { emoji: "🔍", title: "Pantau Gejala Secara Rutin", desc: "Periksa permukaan bawah daun secara teratur untuk mendeteksi bintik bulat abu-abu khas jamur Cercospora sejak dini." },
      { emoji: "🛡", title: "Perlindungan Tambahan", desc: "Jika infeksi meluas, pertimbangkan penggunaan agens hayati atau fungisida berbahan aktif tembaga atau mankozeb sesuai anjuran ahli." }
    ];
  }
  
  return [
    { emoji: "💧", title: "Penyiraman Konsisten", desc: "Lakukan penyiraman secara teratur pada akar tanaman sesuai tingkat kelembapan tanah, hindari kondisi tanah terlalu becek." },
    { emoji: "🌱", title: "Pemupukan Seimbang", desc: "Berikan pupuk makro (NPK) dan mikro secara teratur untuk menjaga daya tahan alami tanaman terhadap serangan patogen." },
    { emoji: "🧹", title: "Sanitasi Lingkungan Kebun", desc: "Jaga kebersihan area budidaya dari gulma dan daun-daun kering yang rontok untuk menekan potensi sarang hama pembawa penyakit." },
    { emoji: "☀️", title: "Pastikan Cahaya Cukup", desc: "Pastikan tanaman mendapatkan sinar matahari yang cukup (minimal 6-8 jam sehari) untuk mendukung fotosintesis optimal." },
    { emoji: "🔍", title: "Inspeksi Visual Mingguan", desc: "Lakukan pemeriksaan visual pada daun dan buah secara berkala agar jika ada gejala awal hama atau jamur dapat langsung diantisipasi." }
  ];
};

export default function ClassificationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const supabase = createSupabaseClient()
  const router = useRouter()
  const [log, setLog] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const diseaseInfo = log ? getDiseaseDetails(log.result) : { 
    name: "", 
    description: "", 
    details: { 
      whatIs: "", 
      howAttacks: "", 
      symptoms: [], 
      transmission: [], 
      impact: "" 
    } 
  }
  const recommendations = log ? getRecommendations(log.result) : []

  useEffect(() => {
    async function fetchDetail() {
      try {
        const { data, error } = await supabase
          .from("classifications")
          .select("*")
          .eq("id", id)
          .single()
        
        if (error) throw error
        setLog(data)
      } catch (error) {
        console.error("Error fetching detail:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center animate-pulse">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-primary font-bold uppercase tracking-widest text-xs">Memuat Detail...</p>
        </div>
      </div>
    )
  }

  if (!log) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface">
        <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">sentiment_dissatisfied</span>
        <h2 className="text-2xl font-bold text-on-surface mb-2">Data Tidak Ditemukan</h2>
        <p className="text-on-surface-variant mb-6">Riwayat klasifikasi mungkin telah dihapus.</p>
        <Link href="/history" className="px-6 py-2 bg-primary text-white rounded-xl font-bold shadow-lg">
          Kembali ke Riwayat
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 bg-surface">
      <header className="flex justify-between items-center">
        <div>
          <Link href="/history" className="text-primary flex items-center gap-2 text-sm font-bold mb-4 hover:gap-1 transition-all">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            KEMBALI KE RIWAYAT
          </Link>
          <h2 className="text-4xl font-heading font-extrabold text-on-surface tracking-tight mb-2">Laporan Analisis</h2>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Specimen Profile */}
        <div className="space-y-6">
          <div className="bg-card rounded-3xl overflow-hidden shadow-xl border border-outline/10">
            <div className="relative aspect-square bg-surface-container-low">
              <img src={log.image_url} alt={log.result} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6">
                <span className={cn("px-4 py-1.5 rounded-full text-xs font-black text-white uppercase tracking-widest shadow-lg", 
                  isHealthyResult(log.result) ? "bg-emerald-500" : "bg-red-500"
                )}>
                  {isHealthyResult(log.result) ? 'Optimal' : 'Kritis'}
                </span>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Diagnosis Utama</p>
                  <h3 className="text-3xl font-heading font-black text-on-surface leading-tight">{log.result}</h3>
                  <div className={cn(
                    "inline-flex items-center text-xs font-bold mt-2 px-2.5 py-1 rounded-full gap-1",
                    log.confidence >= 0.8
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-400"
                  )}>
                    <span>{log.confidence >= 0.8 ? '✓ Keyakinan Tinggi' : '✓ Keyakinan Baik'}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Confidence Score</p>
                  <p className="text-3xl font-black text-emerald-600">{(log.confidence * 100).toFixed(1)}%</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-outline/5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest mb-1">Spesies</p>
                  <p className="font-bold text-on-surface italic">{log.species || 'Capsicum annuum'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest mb-1">Tanggal & Waktu Scan</p>
                  <p className="font-bold text-on-surface">
                    {new Date(log.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Neural Insights & Actions */}
        <div className="space-y-8">
          <section className="bg-emerald-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 w-48 h-48 bg-emerald-500 rounded-full blur-[100px] opacity-20 -mr-24 -mt-24"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    title="Klik untuk detail"
                    className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30 hover:bg-emerald-500/40 hover:scale-105 active:scale-95 transition-all text-emerald-400 cursor-pointer"
                  >
                    <span className="material-symbols-outlined">medical_services</span>
                  </button>
                  <h4 className="text-lg font-bold">Informasi Penyakit</h4>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                >
                  Detail Lengkap
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </button>
              </div>
              <div className="space-y-4 text-emerald-100/90 text-sm leading-relaxed font-sans">
                <div>
                  <span className="block text-xs uppercase tracking-widest text-emerald-400 font-black">Nama Penyakit:</span>
                  <span className="text-xl font-black text-white">{diseaseInfo.name}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-emerald-400 font-black">Deskripsi:</span>
                  <p className="mt-1 italic">{diseaseInfo.description}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h4 className="text-lg font-bold text-on-surface">📋 Rekomendasi Penanganan</h4>
            <div className="space-y-4">
              {recommendations.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-card rounded-2xl border border-outline/10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center shrink-0 text-2xl">
                    {item.emoji}
                  </div>
                  <div>
                    <h5 className="font-bold text-on-surface text-sm">{item.title}</h5>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* Disease Detail Modal */}
      {isModalOpen && diseaseInfo.details && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface text-on-surface max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl p-8 border border-outline-variant/10 shadow-2xl relative space-y-6 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-outline-variant/20 pb-4">
              <div>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] block mb-1">
                  Detail Informasi Penyakit
                </span>
                <h3 className="text-3xl font-heading font-black text-on-surface">
                  {diseaseInfo.name}
                </h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-surface-container-highest transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-6 text-sm font-sans leading-relaxed text-on-surface-variant">
              {/* Apa itu */}
              <div>
                <h4 className="font-bold text-on-surface text-base mb-1">
                  Apa itu {diseaseInfo.name}?
                </h4>
                <p className="text-sm">{diseaseInfo.details.whatIs}</p>
              </div>

              {/* Bagaimana menyerang */}
              <div>
                <h4 className="font-bold text-on-surface text-base mb-1">
                  Bagaimana penyakit ini menyerang tanaman?
                </h4>
                <p className="text-sm">{diseaseInfo.details.howAttacks}</p>
              </div>

              {/* Gejala yang muncul */}
              <div>
                <h4 className="font-bold text-on-surface text-base mb-2">
                  Gejala yang muncul
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-sm">
                  {diseaseInfo.details.symptoms.map((symptom, idx) => (
                    <li key={idx}>{symptom}</li>
                  ))}
                </ul>
              </div>

              {/* Penyebab penyebaran / Faktor pertahanan */}
              <div>
                <h4 className="font-bold text-on-surface text-base mb-2">
                  {isHealthyResult(log.result) ? "Faktor Pertahanan Alami" : "Penyebab penyebaran"}
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-sm">
                  {diseaseInfo.details.transmission.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Dampak */}
              <div>
                <h4 className="font-bold text-on-surface text-base mb-1">
                  Dampak terhadap tanaman
                </h4>
                <p className="text-sm">{diseaseInfo.details.impact}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 bg-primary text-on-primary font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
