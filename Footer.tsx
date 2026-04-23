import { UtensilsCrossed, MessageCircle, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <UtensilsCrossed size={20} className="text-[#c8a96e]" />
              <span className="font-black text-white tracking-widest uppercase text-sm">
                Kafeteria <span className="text-[#c8a96e]">KV Setapak</span>
              </span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed italic">
              &ldquo;Where the Night Gets Delicious.&rdquo;
            </p>
            <p className="text-white/20 text-xs mt-2">Crispy. Bold. Legendary.</p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
              <Clock size={14} className="text-[#c8a96e]" /> Waktu Order
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/40">Slot</span>
                <span className="text-white">Malam Sahaja</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Last Order</span>
                <span className="text-[#c8a96e] font-bold">8:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Boleh Ambil</span>
                <span className="text-[#c8a96e] font-bold">9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
              <MessageCircle size={14} className="text-[#c8a96e]" /> Hubungi Kami
            </h4>
            <a
              href="https://wa.me/60125659470"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 hover:border-green-500/50 text-green-400 text-sm px-4 py-2.5 rounded-xl transition-all duration-200 hover:bg-green-500/20"
            >
              <MessageCircle size={15} />
              WhatsApp: +60125659470
            </a>
            <p className="text-white/20 text-xs mt-3">
              Untuk pertanyaan & semakan pesanan
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            © 2024 Kafeteria KV Setapak. All rights reserved.
          </p>
          <p className="text-white/15 text-xs italic">
            Night-time only. Order wisely.
          </p>
        </div>
      </div>
    </footer>
  )
}
