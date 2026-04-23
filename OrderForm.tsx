"use client"

import { useState } from "react"
import { X, Minus, Plus, ShoppingCart, Send, Trash2, AlertCircle, CheckCircle } from "lucide-react"
import type { CartItem } from "@/app/page"

interface Props {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string, cheeseSlice: boolean) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (val: boolean) => void
}

interface FormData {
  name: string
  phone: string
  dorm: string
}

export default function OrderForm({
  cartItems,
  addToCart,
  removeFromCart,
  clearCart,
  isCartOpen,
  setIsCartOpen,
}: Props) {
  const [formData, setFormData] = useState<FormData>({ name: "", phone: "", dorm: "" })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [sent, setSent] = useState(false)

  const foodTotal = cartItems
    .filter((i) => i.category === "food")
    .reduce((sum, i) => sum + i.price * i.qty, 0)

  const drinkTotal = cartItems
    .filter((i) => i.category === "drink")
    .reduce((sum, i) => sum + i.price * i.qty, 0)

  const total = foodTotal + drinkTotal

  const validate = () => {
    const errs: Partial<FormData> = {}
    if (!formData.name.trim()) errs.name = "Nama wajib diisi"
    if (!formData.phone.trim()) errs.phone = "No. Phone wajib diisi"
    else if (!/^(\+?6?0)[0-9]{8,10}$/.test(formData.phone.replace(/\s/g, "")))
      errs.phone = "Format no. phone tidak sah"
    if (!formData.dorm.trim()) errs.dorm = "Dorm Asrama wajib diisi"
    return errs
  }

  const handleSubmit = () => {
    if (cartItems.length === 0) return

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})

    const foodLines = cartItems
      .filter((i) => i.category === "food")
      .map((i) => `• ${i.name} x${i.qty} — RM${(i.price * i.qty).toFixed(2)}`)
      .join("%0A")

    const drinkLines = cartItems
      .filter((i) => i.category === "drink")
      .map((i) => `• ${i.name} x${i.qty} — RM${(i.price * i.qty).toFixed(2)}`)
      .join("%0A")

    const now = new Date()
    const timeStr = now.toLocaleTimeString("ms-MY", { hour: "2-digit", minute: "2-digit", hour12: true })

    const message = [
      `🍽️ *PESANAN BARU — Kafeteria KV Setapak*`,
      `———————————————`,
      `👤 *Nama:* ${formData.name}`,
      `📱 *No. Phone:* ${formData.phone}`,
      `🏠 *Dorm Asrama:* ${formData.dorm}`,
      `———————————————`,
      foodLines ? `🥩 *Makanan:*%0A${foodLines}` : "",
      drinkLines ? `☕ *Minuman:*%0A${drinkLines}` : "",
      `———————————————`,
      foodTotal > 0 ? `🥩 *Jumlah Makanan:* RM${foodTotal.toFixed(2)}` : "",
      drinkTotal > 0 ? `🥤 *Jumlah Minuman:* RM${drinkTotal.toFixed(2)}` : "",
      `💰 *JUMLAH KESELURUHAN:* RM${total.toFixed(2)}`,
      `⏰ *Masa Order:* ${timeStr}`,
      `———————————————`,
      `_Pickup: 9:00 PM | Last Order: 8:30 PM_`,
    ]
      .filter(Boolean)
      .join("%0A")

    const waNumber = "60125659470"
    const waUrl = `https://wa.me/${waNumber}?text=${message}`
    window.open(waUrl, "_blank")

    setSent(true)
    setTimeout(() => {
      setSent(false)
      clearCart()
      setFormData({ name: "", phone: "", dorm: "" })
      setIsCartOpen(false)
    }, 2000)
  }

  if (!isCartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#111] border-l border-white/8 overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-[#111] border-b border-white/8 px-5 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} className="text-[#c8a96e]" />
            <h2 className="text-white font-black text-lg tracking-tight">Your Order</h2>
            {cartItems.length > 0 && (
              <span className="bg-[#c8a96e] text-black text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                {cartItems.reduce((a, b) => a + b.qty, 0)}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-white/60" />
          </button>
        </div>

        <div className="flex-1 px-5 py-5 space-y-6">
          {/* Cart items */}
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <ShoppingCart size={40} className="text-white/10" />
              <p className="text-white/30 text-sm">Cart masih kosong</p>
              <p className="text-white/20 text-xs">Tambah menu dulu!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item, i) => (
                <div
                  key={`${item.id}-${item.cheeseSlice}-${i}`}
                  className="flex items-center gap-3 bg-white/[0.03] border border-white/8 rounded-xl p-3"
                >
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">{item.name}</p>
                    {item.category === "food" && (
                      <p className="text-[#c8a96e] text-xs mt-0.5">RM {item.price.toFixed(2)} each</p>
                    )}
                    {item.category === "drink" && (
                      <p className="text-blue-400 text-xs mt-0.5">RM {item.price.toFixed(2)} each</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.id, item.cheeseSlice)}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                      <Minus size={12} className="text-white/60" />
                    </button>
                    <span className="text-white font-bold text-sm w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() =>
                        addToCart({ ...item, qty: 1 })
                      }
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                      <Plus size={12} className="text-white/60" />
                    </button>
                  </div>
                  <p className="text-white font-bold text-sm w-14 text-right">
                    RM {(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}

              {/* Total */}
              <div className="bg-[#c8a96e]/10 border border-[#c8a96e]/20 rounded-xl p-4 flex items-center justify-between">
                <span className="text-white/70 text-sm">Jumlah Keseluruhan</span>
                <span className="text-[#c8a96e] font-black text-xl">RM {total.toFixed(2)}</span>
              </div>

              <button
                onClick={clearCart}
                className="flex items-center gap-2 text-white/30 hover:text-red-400 transition-colors text-xs"
              >
                <Trash2 size={12} />
                Clear cart
              </button>
            </div>
          )}

          {/* Order Form */}
          <div id="order" className="border-t border-white/8 pt-6">
            <h3 className="text-white font-black text-base mb-1 tracking-tight">Maklumat Pembeli</h3>
            <p className="text-white/40 text-xs mb-4">Semua medan wajib diisi</p>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-1.5 block">
                  Nama Penuh *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Ahmad Rizwan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c8a96e]/60 transition-colors ${
                    errors.name ? "border-red-500/50" : "border-white/10"
                  }`}
                />
                {errors.name && (
                  <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
                    <AlertCircle size={11} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-1.5 block">
                  No. Phone *
                </label>
                <input
                  type="tel"
                  placeholder="Contoh: 0123456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c8a96e]/60 transition-colors ${
                    errors.phone ? "border-red-500/50" : "border-white/10"
                  }`}
                />
                {errors.phone && (
                  <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
                    <AlertCircle size={11} /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Dorm */}
              <div>
                <label className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-1.5 block">
                  Dorm Asrama *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Dorm A5 / Blok B Bilik 203"
                  value={formData.dorm}
                  onChange={(e) => setFormData({ ...formData, dorm: e.target.value })}
                  className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#c8a96e]/60 transition-colors ${
                    errors.dorm ? "border-red-500/50" : "border-white/10"
                  }`}
                />
                {errors.dorm && (
                  <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
                    <AlertCircle size={11} /> {errors.dorm}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="sticky bottom-0 bg-[#111] border-t border-white/8 p-5">
          {cartItems.length === 0 && (
            <p className="text-center text-white/30 text-xs mb-3">Tambah item ke cart dahulu</p>
          )}
          <button
            onClick={handleSubmit}
            disabled={cartItems.length === 0 || sent}
            className={`w-full flex items-center justify-center gap-3 font-black py-4 rounded-xl text-sm tracking-widest uppercase transition-all duration-300 ${
              sent
                ? "bg-green-500 text-white"
                : cartItems.length === 0
                ? "bg-white/5 text-white/20 cursor-not-allowed"
                : "bg-[#c8a96e] hover:bg-[#d4b87a] text-black hover:shadow-[0_0_30px_rgba(200,169,110,0.4)] hover:scale-[1.02]"
            }`}
          >
            {sent ? (
              <>
                <CheckCircle size={18} />
                Pesanan Dihantar!
              </>
            ) : (
              <>
                <Send size={16} />
                Hantar ke WhatsApp
              </>
            )}
          </button>
          <p className="text-white/20 text-xs text-center mt-3">
            Pesanan akan dihantar ke WhatsApp +60125659470
          </p>
        </div>
      </div>
    </>
  )
}
