import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getMenuItem } from '../data/menu'

export type CartLine = { menuItemId: string; quantity: number }

type CartContextValue = {
  lines: CartLine[]
  itemCount: number
  subtotalCents: number
  addToCart: (menuItemId: string) => void
  increment: (menuItemId: string) => void
  decrement: (menuItemId: string) => void
  setQuantity: (menuItemId: string, quantity: number) => void
  removeLine: (menuItemId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function lineSubtotal(menuItemId: string, quantity: number): number {
  const item = getMenuItem(menuItemId)
  if (!item) return 0
  return item.priceCents * quantity
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])

  const addToCart = useCallback((menuItemId: string) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.menuItemId === menuItemId)
      if (i === -1) return [...prev, { menuItemId, quantity: 1 }]
      const next = [...prev]
      next[i] = { ...next[i], quantity: next[i].quantity + 1 }
      return next
    })
  }, [])

  const increment = useCallback((menuItemId: string) => {
    addToCart(menuItemId)
  }, [addToCart])

  const decrement = useCallback((menuItemId: string) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.menuItemId === menuItemId)
      if (i === -1) return prev
      const q = prev[i].quantity
      if (q <= 1) return prev.filter((l) => l.menuItemId !== menuItemId)
      const next = [...prev]
      next[i] = { ...next[i], quantity: q - 1 }
      return next
    })
  }, [])

  const setQuantity = useCallback((menuItemId: string, quantity: number) => {
    const q = Math.floor(quantity)
    if (q <= 0) {
      setLines((prev) => prev.filter((l) => l.menuItemId !== menuItemId))
      return
    }
    setLines((prev) => {
      const i = prev.findIndex((l) => l.menuItemId === menuItemId)
      if (i === -1) return [...prev, { menuItemId, quantity: q }]
      const next = [...prev]
      next[i] = { ...next[i], quantity: q }
      return next
    })
  }, [])

  const removeLine = useCallback((menuItemId: string) => {
    setLines((prev) => prev.filter((l) => l.menuItemId !== menuItemId))
  }, [])

  const clearCart = useCallback(() => setLines([]), [])

  const { itemCount, subtotalCents } = useMemo(() => {
    let count = 0
    let sub = 0
    for (const line of lines) {
      count += line.quantity
      sub += lineSubtotal(line.menuItemId, line.quantity)
    }
    return { itemCount: count, subtotalCents: sub }
  }, [lines])

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      subtotalCents,
      addToCart,
      increment,
      decrement,
      setQuantity,
      removeLine,
      clearCart,
    }),
    [
      lines,
      itemCount,
      subtotalCents,
      addToCart,
      increment,
      decrement,
      setQuantity,
      removeLine,
      clearCart,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
