import { cn } from "@/lib/utils"

const sessions = [
  { device: "MacBook Pro 16\"", location: "Surabaya, Indonesia • 192.168.1.1", lastActive: "Baru Saja", current: true, icon: "laptop_mac" },
  { device: "iPhone 15 Pro", location: "Surabaya, Indonesia • Mobile Network", lastActive: "12 menit yang lalu", current: false, icon: "smartphone" },
  { device: "Terminal Lab #04", location: "Fasilitas Lab Utama • 10.0.0.42", lastActive: "Kemarin, 14:20", current: false, icon: "terminal" },
]

export default function ProfilePage() {
  return (
    <div className="p-12 max-w-7xl mx-auto space-y-12 bg-surface">
      <header>
        <h2 className="text-4xl font-heading font-extrabold tracking-tight text-on-surface mb-2">Profil Admin</h2>
        <p className="text-on-surface-variant max-w-2xl font-sans">Kelola kredensial peneliti Anda dan pantau keamanan akun di seluruh jaringan Lab Botani.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-sans">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-surface-container-low rounded-xl p-8 relative overflow-hidden group border border-outline-variant/10 shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="relative mb-6">
                <img 
                  className="w-32 h-32 rounded-xl object-cover shadow-2xl ring-4 ring-white" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOJgc7KknXztXxlcsTTyRJMPp2mF_S0DLAWPFylVXUO3AJjcjNk3B6zE9qDsYur7C1kBiBtoa9kT1msRVal9fACZG1Smw1_0NBwEpoomCWo4B2qhF_I1BUZyMclSGyCcLQvls32PYac6NXr0musmnw4fXpkN59UtzKj1cwKSTOcPk-9Sb4I6zux1M6sAUdL-BGj94aaucPPSH1QUpUe9hCWgO5zAcMZS17kwZccZn2yH1nDr3vp67OINV3tYtiBM4yVjhaISLVe58"
                  alt="Budi Santoso"
                />
                <button className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-lg shadow-lg hover:bg-primary-container transition-colors active:scale-95">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
              </div>
              <h3 className="text-2xl font-heading font-bold text-on-surface mb-1">Budi Santoso</h3>
              <p className="text-primary font-bold text-sm mb-6 px-4 py-1 bg-primary/10 rounded-full">Administrator Utama & Peneliti</p>
              
              <div className="w-full grid grid-cols-2 gap-4 border-t border-stone-200/50 pt-6 mt-2">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Nomor ID</p>
                  <p className="font-heading font-bold text-on-surface tracking-tight">BL-2024-991</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Departemen</p>
                  <p className="font-heading font-bold text-on-surface tracking-tight">Patologi</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 font-sans">
            <button className="w-full flex items-center justify-between p-4 bg-surface-container-highest rounded-xl group hover:bg-primary/5 transition-colors">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">photo_camera</span>
                <span className="font-bold text-sm">Perbarui Foto</span>
              </div>
              <span className="material-symbols-outlined text-stone-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-surface-container-highest rounded-xl group hover:bg-primary/5 transition-colors">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">lock_reset</span>
                <span className="font-bold text-sm">Ubah Sandi</span>
              </div>
              <span className="material-symbols-outlined text-stone-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-error-container/10 rounded-xl group hover:bg-error-container/20 transition-colors border border-error/5">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-error">logout</span>
                <span className="font-bold text-sm text-error">Keluar Sesi</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Security Logs */}
        <div className="lg:col-span-7 space-y-8 font-sans">
          <section className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-heading font-bold tracking-tight">Log Keamanan</h3>
                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-1 opacity-60">Audit Akses Akun</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">3 SESI AKTIF</span>
            </div>

            <div className="space-y-4">
              {sessions.map((session, idx) => (
                <div key={idx} className="bg-surface-container-lowest p-6 rounded-lg flex items-start gap-4 hover:shadow-lg transition-all border border-transparent hover:border-outline-variant/10">
                  <div className="p-3 bg-stone-100 dark:bg-slate-800 rounded-lg text-stone-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-2xl">{session.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-on-surface">{session.device}</h4>
                      {session.current ? (
                        <span className="text-[10px] px-2 py-0.5 bg-primary text-white rounded font-bold uppercase">Perangkat Saat Ini</span>
                      ) : (
                        <button className="text-[10px] font-bold text-error uppercase hover:underline">Cabut</button>
                      )}
                    </div>
                    <p className="text-sm text-on-surface-variant opacity-80">{session.location}</p>
                    <p className="text-[10px] font-bold text-stone-400 mt-2 uppercase tracking-tighter">Aktif Terakhir: {session.lastActive}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-stone-200/50">
              <button className="text-primary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest text-[10px]">
                Lihat Semua Riwayat Aktivitas
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </section>

          {/* Account Tier Bento Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary-container/10 p-6 rounded-xl border border-primary/10">
              <p className="text-[10px] font-black text-primary-container uppercase tracking-[0.2em] mb-4">Total Pemindaian Dilakukan</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-heading font-black text-primary tracking-tighter">1,284</span>
                <span className="text-xs font-bold text-primary/60 mb-1">+12% bulan ini</span>
              </div>
            </div>
            <div className="bg-secondary-container/10 p-6 rounded-xl border border-secondary/10">
              <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-4">Kredensial Laboratorium</p>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-secondary fill-current">verified_user</span>
                <span className="text-xl font-heading font-bold text-secondary">Admin Terverifikasi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
