"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/Hero"
import MenuSection from "@/components/MenuSection"
import OrderForm from "@/components/OrderForm"
import InfoSection from "@/components/InfoSection"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.cheeseSlice === item.cheeseSlice
      )
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.cheeseSlice === item.cheeseSlice
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const removeFromCart = (id: string, cheeseSlice: boolean) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === id && i.cheeseSlice === cheeseSlice
            ? { ...i, qty: i.qty - 1 }
            : i
        )
        .filter((i) => i.qty > 0)
    )
  }

  const clearCart = () => setCartItems([])

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden">
      <Navbar cartCount={cartItems.reduce((a, b) => a + b.qty, 0)} onCartClick={() => setIsCartOpen(true)} />
      <Hero />
      <InfoSection />
      <MenuSection addToCart={addToCart} />
      <OrderForm
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />
      <Footer />
    </main>
  )
}

export interface CartItem {
  id: string
  name: string
  price: number
  cheeseSlice: boolean
  qty: number
  category: "food" | "drink"
}
