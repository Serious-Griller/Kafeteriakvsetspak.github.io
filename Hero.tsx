"use client"

import { ChevronDown, Clock, MapPin } from "lucide-react"

export default function Hero() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[#0f0f0f]">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #c8a96e 0px,
              #c8a96e 1px,
              transparent 1px,
              transparent 60px
            )`
          }}
        />
      </div>

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c8a96e]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#c8a96e]/10 border border-[#c8a96e]/30 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-[#c8a96e] rounded-full animate-pulse" />
          <span className="text-[#c8a96e] text-xs tracking-[0.3em] uppercase font-medium">
            Malam Order — 9:00 PM Pickup
          </span>
        </div>

        {/* Main title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4 leading-none">
          <span className="text-white">KAFETERIA</span>
          <br />
          <span className="text-[#c8a96e]">KV SETAPAK</span>
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="h-px w-16 bg-[#c8a96e]/40" />
          <span className="text-[#c8a96e] text-xs tracking-[0.4em] uppercase">Est. Malam</span>
          <div className="h-px w-16 bg-[#c8a96e]/40" />
        </div>

        {/* Slogan */}
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-white/70 mb-2 italic">
          &ldquo;Where the Night Gets Delicious.&rdquo;
        </p>
        <p className="text-sm text-white/40 tracking-widest uppercase mb-10">
          Crispy. Bold. Legendary.
        </p>

        {/* Info pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <Clock size={14} className="text-[#c8a96e]" />
            <span className="text-white/70 text-xs tracking-wide">Last Order: 8:30 PM</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <Clock size={14} className="text-[#c8a96e]" />
            <span className="text-white/70 text-xs tracking-wide">Pickup: 9:00 PM</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <MapPin size={14} className="text-[#c8a96e]" />
            <span className="text-white/70 text-xs tracking-wide">Dorm Delivery via WhatsApp</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={scrollToMenu}
          className="group inline-flex items-center gap-3 bg-[#c8a96e] hover:bg-[#d4b87a] text-black font-bold px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(200,169,110,0.4)]"
        >
          View Menu & Order
          <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <ChevronDown size={20} className="text-white/20" />
      </div>
    </section>
  )
}
