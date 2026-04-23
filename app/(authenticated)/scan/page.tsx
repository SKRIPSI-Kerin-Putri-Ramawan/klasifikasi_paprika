"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { createSupabaseClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"


export default function ScanPage() {
  const supabase = createSupabaseClient()
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Attach stream to video element when it becomes available
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream, isCameraActive])

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setImagePreview(objectUrl)
      startAnalysis(file)
    }
  }

  const saveClassification = async (result: string, confidence: number, imageUrl: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      const { data, error } = await supabase
        .from('classifications')
        .insert([
          { 
            user_id: user.id,
            result, 
            confidence: confidence / 100, 
            image_url: imageUrl,
            status: 'COMPLETED'
          }
        ])
      
      if (error) throw error
      console.log("Analysis saved:", data)
    } catch (err) {
      console.error("Error saving classification:", err)
    }
  }

  const startAnalysis = async (fileToUpload: File | Blob) => {
    setIsAnalyzing(true)
    setShowResults(false)
    
    try {
      const fileExt = fileToUpload instanceof File ? fileToUpload.name.split('.').pop() : 'jpg'
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `public/${fileName}`
      
      const { error: uploadError } = await supabase.storage
        .from('scans')
        .upload(filePath, fileToUpload)
        
      if (uploadError) throw uploadError
      
      const { data: { publicUrl } } = supabase.storage
        .from('scans')
        .getPublicUrl(filePath)

      // Simulate deep learning analysis
      setTimeout(() => {
        setIsAnalyzing(false)
        setShowResults(true)
        
        // Auto-save result to Supabase
        saveClassification("Bercak Bakteri", 98.4, publicUrl)
      }, 3000)

    } catch (err) {
      console.error("Upload error:", err)
      alert("Gagal mengunggah gambar. Silakan coba lagi.")
      setIsAnalyzing(false)
    }
  }

  const toggleCamera = async () => {
    if (isCameraActive) {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
        setStream(null)
      }
      setIsCameraActive(false)
    } else {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        })
        setStream(newStream)
        setIsCameraActive(true)
      } catch (err) {
        console.error("Camera access denied:", err)
        // Fallback for devices without back camera
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true })
          setStream(fallbackStream)
          setIsCameraActive(true)
        } catch (fallbackErr) {
          alert("Gagal mengakses kamera. Pastikan Anda memberikan izin dan menggunakan koneksi aman (HTTPS).")
        }
      }
    }
  }

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext("2d")
      ctx?.drawImage(videoRef.current, 0, 0)
      
      canvas.toBlob((blob) => {
        if (blob) {
          const objectUrl = URL.createObjectURL(blob)
          setImagePreview(objectUrl)
          toggleCamera()
          startAnalysis(blob)
        }
      }, "image/jpeg", 0.9)
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 bg-surface">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileUpload} 
      />
      {/* Header Section */}
      <header>
        <h2 className="text-4xl font-heading font-extrabold text-on-surface tracking-tight mb-2">Analisis Klasifikasi Daun</h2>
        <p className="text-on-surface-variant font-sans text-lg">Unggah spesimen botani atau ambil foto langsung untuk deteksi patogen.</p>
      </header>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upload & Live Camera */}
        <div className="lg:col-span-7 space-y-6">
          <div 
            onClick={() => !isCameraActive && fileInputRef.current?.click()}
            className={cn(
              "bg-surface-container-low rounded-xl p-8 border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center min-h-[300px] text-center group transition-all",
              !isCameraActive && "cursor-pointer hover:bg-surface-container-high hover:border-primary/50"
            )}
          >
            {!isCameraActive ? (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-3xl">add_a_photo</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Mulai Analisis Spesimen</h3>
                <p className="text-on-surface-variant text-sm max-w-xs mb-6 font-sans">Ambil foto langsung atau unggah gambar dari perangkat Anda.</p>
                <div className="flex gap-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
                    className="px-6 py-2 bg-primary text-on-primary font-bold rounded-lg hover:opacity-90 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">upload</span>
                    Unggah
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleCamera() }}
                    className="px-6 py-2 bg-secondary-container text-on-secondary-container font-bold rounded-lg hover:bg-secondary-fixed transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">camera</span>
                    Kamera
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full space-y-4">
                <div className="relative rounded-lg overflow-hidden bg-black aspect-video bg-stone-900 border border-outline-variant/20">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-2 border-primary/30 pointer-events-none">
                    <div className="absolute inset-10 border-2 border-white/20 rounded-xl"></div>
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={capturePhoto}
                    className="h-14 w-14 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-xl active:scale-90 transition-transform"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary"></div>
                  </button>
                  <button 
                    onClick={toggleCamera}
                    className="h-14 w-14 rounded-full bg-error-container text-on-error-container flex items-center justify-center shadow-lg hover:bg-error transition-colors"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Active Scan Preview & Progress */}
          {(imagePreview || isAnalyzing) && (
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-inner border border-surface-container transition-all animate-in fade-in slide-in-from-bottom-4">
              <div className="p-4 bg-surface-container-low flex justify-between items-center border-b border-surface-container">
                <span className="text-[10px] font-sans font-black tracking-widest text-on-surface-variant uppercase">
                  {isAnalyzing ? "Memproses Data Neural..." : "Status: Siap untuk Klasifikasi"}
                </span>
                {isAnalyzing && (
                  <div className="flex gap-2 items-center">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-[10px] font-bold text-primary uppercase">MENGEKSTRAKSI FITUR</span>
                  </div>
                )}
              </div>
              <div className="relative aspect-video bg-stone-200">
                {imagePreview && (
                  <img 
                    className={cn("w-full h-full object-cover", isAnalyzing && "opacity-40 grayscale")} 
                    src={imagePreview}
                    alt="Active specimen preview"
                  />
                )}
                
                {isAnalyzing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 px-12">
                    <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden backdrop-blur-md">
                      <div className="h-full bg-primary animate-progress duration-[3000ms]"></div>
                    </div>
                    <p className="text-white text-xs font-bold uppercase tracking-[0.2em] drop-shadow-md">Menghitung Probabilitas...</p>
                  </div>
                )}

                {!isAnalyzing && imagePreview && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 border-2 border-primary/40 rounded-xl relative">
                      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Results - Conditional Rendering */}
        <div className="lg:col-span-5 space-y-6">
          {showResults ? (
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10 animate-in zoom-in-95 duration-500">
              <div className="flex justify-between items-start mb-8 text-sans">
                <div>
                  <p className="text-[10px] font-sans font-bold text-stone-500 uppercase tracking-widest mb-1">Hasil Diagnosis AI</p>
                  <h4 className="text-3xl font-heading font-extrabold text-on-surface leading-tight">Bercak Bakteri</h4>
                  <p className="text-emerald-700 font-medium text-sm mt-1 flex items-center gap-1 font-sans">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    Terdeteksi (Status: Kritis)
                  </p>
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-lg text-center">
                  <span className="block text-primary text-2xl font-black font-heading">98.4%</span>
                  <span className="text-[9px] font-sans font-bold text-primary/70 uppercase">Skor CNN</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h5 className="text-[10px] font-sans font-black text-on-surface-variant mb-3 uppercase tracking-widest">Penjelasan Patogen</h5>
                  <div className="bg-surface-container-low p-4 rounded-lg border-l-4 border-primary">
                    <p className="text-sm text-on-surface-variant leading-relaxed font-sans italic">
                      "Analisis neural mendeteksi lesi nekrotik basah dengan halo klorotik pada kutikula daun, sangat konsisten dengan isolat <span className="font-bold">Xanthomonas campestris</span>."
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] font-sans font-black text-on-surface-variant mb-3 uppercase tracking-widest">Tindakan Segera</h5>
                  <ul className="space-y-3 font-sans">
                    {[
                      { title: "Karantina Spesimen", desc: "Pisahkan tanaman yang terinfeksi untuk mencegah penyebaran lateral." },
                      { title: "Bakterisida Tembaga", desc: "Semprotkan pada seluruh permukaan daun setiap 10 hari." },
                      { title: "Sterilisasi Alat", desc: "Bersihkan gunting pangkas dengan alkohol 70% setelah penggunaan." }
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

                <div className="pt-4 border-t border-surface-container">
                  <button 
                    onClick={() => router.push('/history')}
                    className="w-full py-3 bg-primary text-on-primary font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span className="material-symbols-outlined">description</span>
                    Lihat Laporan Lengkap
                  </button>
                </div>
              </div>
            </div>
          ) : !isAnalyzing && !imagePreview ? (
            <div className="bg-surface-container-lowest rounded-xl p-12 shadow-sm border border-outline-variant/10 text-center flex flex-col items-center justify-center min-h-[400px]">
              <span className="material-symbols-outlined text-stone-200 text-6xl mb-4">search_insights</span>
              <p className="text-stone-400 font-sans font-medium italic">
                Sistem menunggu input spesimen.<br/>Unggah foto untuk memulai analisis neural.
              </p>
            </div>
          ) : isAnalyzing ? (
            <div className="bg-surface-container-lowest rounded-xl p-12 shadow-sm border border-outline-variant/10 text-center flex flex-col items-center justify-center min-h-[400px] animate-pulse">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-primary font-sans font-bold uppercase tracking-widest text-xs">
                Sedang Menganalisis...
              </p>
            </div>
          ) : null}

          {/* Environment Stats (Always show if results or analyzing but let's keep them here) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary mb-2">thermostat</span>
              <span className="block text-[9px] font-sans font-bold text-stone-500 uppercase tracking-widest">Suhu Kalibrasi</span>
              <span className="text-lg font-bold font-heading">24.5°C</span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary mb-2">humidity_percentage</span>
              <span className="block text-[9px] font-sans font-bold text-stone-500 uppercase tracking-widest">Kelembapan</span>
              <span className="text-lg font-bold font-heading">62%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
