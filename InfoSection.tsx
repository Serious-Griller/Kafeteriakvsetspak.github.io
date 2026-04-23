import { Clock, ShoppingBag, MessageCircle, CheckCircle } from "lucide-react"

export default function InfoSection() {
  const steps = [
    {
      icon: <ShoppingBag size={24} className="text-[#c8a96e]" />,
      title: "01 — Pilih Menu",
      desc: "Browse menu & tambah ke cart. Add-on Cheese Slice RM1 kalau nak extra.",
    },
    {
      icon: <CheckCircle size={24} className="text-[#c8a96e]" />,
      title: "02 — Isi Maklumat",
      desc: "Nama, No. Phone & Dorm Asrama wajib diisi. Jangan lupa, ya!",
    },
    {
      icon: <MessageCircle size={24} className="text-[#c8a96e]" />,
      title: "03 — Hantar ke WhatsApp",
      desc: "Klik butang Order — pesanan akan dihantar terus ke WhatsApp kami.",
    },
    {
      icon: <Clock size={24} className="text-[#c8a96e]" />,
      title: "04 — Ambil Jam 9 PM",
      desc: "Ready dari 9:00 PM. Last order 8:30 PM. Slot malam sahaja.",
    },
  ]

  return (
    <section id="info" className="py-20 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-[#c8a96e] text-xs tracking-[0.4em] uppercase mb-3">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Order dalam <span className="text-[#c8a96e]">4 Langkah</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative bg-white/[0.03] border border-white/8 rounded-2xl p-6 hover:border-[#c8a96e]/40 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#c8a96e]/10 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-white font-bold text-sm mb-2 tracking-wide">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Time banner */}
        <div className="mt-10 bg-[#c8a96e]/10 border border-[#c8a96e]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#c8a96e]/20 flex items-center justify-center">
              <Clock size={22} className="text-[#c8a96e]" />
            </div>
            <div>
              <p className="text-white font-bold text-base">Waktu Operasi — Malam Sahaja</p>
              <p className="text-white/50 text-sm">Slot order dibuka setiap malam</p>
            </div>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <p className="text-[#c8a96e] font-black text-xl">8:30 PM</p>
              <p className="text-white/40 text-xs tracking-wider uppercase">Last Order</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-[#c8a96e] font-black text-xl">9:00 PM</p>
              <p className="text-white/40 text-xs tracking-wider uppercase">Boleh Ambil</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
