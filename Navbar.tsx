"use client"

import { ShoppingCart, UtensilsCrossed } from "lucide-react"

interface NavbarProps {
  cartCount: number
  onCartClick: () => void
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-[#c8a96e]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="text-[#c8a96e]" size={22} />
          <span className="font-bold text-white text-sm sm:text-base tracking-widest uppercase">
            KV <span className="text-[#c8a96e]">Setapak</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Menu", id: "menu" },
            { label: "Order", id: "order" },
            { label: "Info", id: "info" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm text-white/60 hover:text-[#c8a96e] transition-colors tracking-widest uppercase"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={onCartClick}
          className="relative flex items-center gap-2 bg-[#c8a96e] hover:bg-[#d4b87a] text-black font-semibold px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105"
        >
          <ShoppingCart size={16} />
          <span className="hidden sm:inline">Order</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}
