"use client"

import { useState } from "react"
import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react"
import type { CartItem } from "@/app/page"

const foodItems = [
  {
    id: "chicken-chop",
    name: "Chicken Chop",
    sub: "Black Pepper",
    desc: "Tender grilled chicken drenched in rich black pepper sauce. Western comfort at its finest.",
    price: 7.0,
    badge: "Best Seller",
    emoji: "🥩",
  },
  {
    id: "crispy-fried-chicken",
    name: "Crispy Fried Chicken",
    sub: "Golden & Crunchy",
    desc: "Perfectly seasoned, golden-fried to crispy perfection. Classic never goes wrong.",
    price: 7.0,
    badge: "Classic",
    emoji: "🍗",
  },
  {
    id: "crispy-chicken-burger",
    name: "Crispy Chicken Burger",
    sub: "Stacked & Loaded",
    desc: "Crispy fillet between fluffy buns. Simple. Bold. Satisfaction guaranteed.",
    price: 7.0,
    badge: "Fan Fav",
    emoji: "🍔",
  },
]

const drinkItems = [
  { id: "nescafe", name: "Nescafe", price: 3.0, category: "cold" },
  { id: "milo", name: "Milo", price: 3.0, category: "cold" },
  { id: "teh", name: "Teh", price: 3.0, category: "cold" },
  { id: "sirap-bandung", name: "Sirap Bandung", price: 3.0, category: "cold" },
  { id: "extrajoss-mangga", name: "Extrajoss Mangga", price: 3.0, category: "cold" },
  { id: "extrajoss-anggur", name: "Extrajoss Anggur", price: 3.0, category: "cold" },
  { id: "vanilla-blue", name: "Vanilla Blue", price: 3.0, category: "cold" },
  { id: "keladi", name: "Keladi", price: 3.0, category: "cold" },
  { id: "cappuccino", name: "Cappuccino", price: 3.0, category: "cold" },
  { id: "kopi", name: "Kopi", price: 3.0, category: "cold" },
  { id: "neslo", name: "Neslo", price: 3.0, category: "cold" },
]

interface Props {
  addToCart: (item: CartItem) => void
}

export default function MenuSection({ addToCart }: Props) {
  const [cheeseMap, setCheeseMap] = useState<Record<string, boolean>>({})
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({})
  const [showDrinks, setShowDrinks] = useState(false)
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null)

  const toggleCheese = (id: string) => {
    setCheeseMap((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleAddFood = (item: (typeof foodItems)[0]) => {
    const cheese = cheeseMap[item.id] ?? false
    addToCart({
      id: item.id,
      name: item.name + (cheese ? " + Cheese" : ""),
      price: item.price + (cheese ? 1 : 0),
      cheeseSlice: cheese,
      qty: 1,
      category: "food",
    })
    setAddedMap((prev) => ({ ...prev, [item.id]: true }))
    setTimeout(() => setAddedMap((prev) => ({ ...prev, [item.id]: false })), 1200)
  }

  const handleAddDrink = (drink: (typeof drinkItems)[0]) => {
    addToCart({
      id: drink.id,
      name: drink.name,
      price: drink.price,
      cheeseSlice: false,
      qty: 1,
      category: "drink",
    })
    setSelectedDrink(drink.id)
    setTimeout(() => setSelectedDrink(null), 1200)
  }

  const categoryLabel: Record<string, string> = {
    cold: "Ais",
  }

  const categoryColor: Record<string, string> = {
    cold: "bg-blue-500/20 text-blue-400 border-blue-500/20",
  }

  return (
    <section id="menu" className="py-20 px-4 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#c8a96e] text-xs tracking-[0.4em] uppercase mb-3">Our Menu</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Pilih <span className="text-[#c8a96e]">Sajian Malam</span> Kamu
          </h2>
          <p className="text-white/40 text-sm">Semua menu harga tetap — RM 7.00 sahaja.</p>
        </div>

        {/* Food Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {foodItems.map((item) => {
            const cheese = cheeseMap[item.id] ?? false
            const added = addedMap[item.id]
            return (
              <div
                key={item.id}
                className="group relative bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden hover:border-[#c8a96e]/40 transition-all duration-300"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-[#c8a96e] text-black text-[10px] font-black px-2 py-1 rounded-full tracking-widest uppercase">
                    {item.badge}
                  </span>
                </div>

                {/* Emoji display */}
                <div className="h-44 bg-gradient-to-br from-[#1a1a1a] to-[#111] flex items-center justify-center border-b border-white/5">
                  <span className="text-8xl select-none filter drop-shadow-lg">{item.emoji}</span>
                </div>

                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="text-white font-black text-lg leading-tight">{item.name}</h3>
                    <p className="text-[#c8a96e] text-xs tracking-widest uppercase mt-0.5">{item.sub}</p>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">{item.desc}</p>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-black text-white">
                        RM {(item.price + (cheese ? 1 : 0)).toFixed(2)}
                      </span>
                      {cheese && (
                        <span className="ml-2 text-[10px] text-[#c8a96e] bg-[#c8a96e]/10 border border-[#c8a96e]/20 px-2 py-0.5 rounded-full">
                          +Cheese RM1
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Cheese toggle */}
                  <button
                    onClick={() => toggleCheese(item.id)}
                    className={`w-full flex items-center justify-between text-sm px-3 py-2 rounded-xl border mb-3 transition-all duration-200 ${
                      cheese
                        ? "border-[#c8a96e]/50 bg-[#c8a96e]/10 text-[#c8a96e]"
                        : "border-white/10 bg-white/3 text-white/40 hover:border-white/20"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🧀</span>
                      <span>Add Cheese Slice (+RM 1.00)</span>
                    </span>
                    {cheese ? <Minus size={14} /> : <Plus size={14} />}
                  </button>

                  {/* Add button */}
                  <button
                    onClick={() => handleAddFood(item)}
                    className={`w-full font-bold py-3 rounded-xl text-sm tracking-widest uppercase transition-all duration-200 ${
                      added
                        ? "bg-green-500 text-white scale-95"
                        : "bg-[#c8a96e] hover:bg-[#d4b87a] text-black hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(200,169,110,0.3)]"
                    }`}
                  >
                    {added ? "✓ Added!" : "Add to Order"}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Add-on notice */}
        <div className="bg-[#c8a96e]/5 border border-[#c8a96e]/15 rounded-2xl p-5 mb-8 flex items-start gap-4">
          <span className="text-2xl">🧀</span>
          <div>
            <p className="text-white font-semibold text-sm mb-1">Add-on: Cheese Slice</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Boleh tambah Cheese Slice pada sebarang makanan dengan harga <span className="text-[#c8a96e] font-bold">RM 1.00</span> sekeping. Toggle button di atas sebelum tambah ke cart!
            </p>
          </div>
        </div>

        {/* Drinks Section */}
        <div className="bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowDrinks(!showDrinks)}
            className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">☕</span>
              <div className="text-left">
                <h3 className="text-white font-black text-lg">Menu Minuman Sejuk</h3>
                <p className="text-white/40 text-sm">{drinkItems.length} pilihan minuman — RM 3.00 setiap satu</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#c8a96e] text-xs tracking-widest uppercase hidden sm:block">
                {showDrinks ? "Sembunyikan" : "Lihat Semua"}
              </span>
              {showDrinks ? (
                <ChevronUp size={20} className="text-[#c8a96e]" />
              ) : (
                <ChevronDown size={20} className="text-[#c8a96e]" />
              )}
            </div>
          </button>

          {showDrinks && (
            <div className="border-t border-white/5 p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {drinkItems.map((drink) => {
                  const isSelected = selectedDrink === drink.id
                  return (
                    <button
                      key={drink.id}
                      onClick={() => handleAddDrink(drink)}
                      className={`group relative flex flex-col items-start p-3 rounded-xl border transition-all duration-200 text-left ${
                        isSelected
                          ? "border-green-500/50 bg-green-500/10"
                          : "border-white/8 bg-white/[0.02] hover:border-[#c8a96e]/40 hover:bg-[#c8a96e]/5"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${categoryColor[drink.category]}`}
                        >
                          {categoryLabel[drink.category]}
                        </span>
                        {isSelected && (
                          <span className="text-green-400 text-xs font-bold">✓</span>
                        )}
                      </div>
                      <p className={`font-semibold text-sm ${isSelected ? "text-green-400" : "text-white"}`}>
                        {isSelected ? "Added!" : drink.name}
                      </p>
                      <p className="text-[#c8a96e] text-xs font-bold mt-0.5">RM 3.00</p>
                    </button>
                  )
                })}
              </div>
              <p className="text-white/30 text-xs mt-4 text-center">
                * Semua minuman adalah sejuk (iced). Harga tetap RM 3.00 setiap satu.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
