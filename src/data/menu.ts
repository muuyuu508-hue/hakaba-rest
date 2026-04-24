export type MenuCategory = { id: string; name: string }

export type MenuItem = {
  id: string
  categoryId: string
  name: string
  description: string
  priceCents: number
  /** Photo URL (remote CDN). */
  imageSrc: string
}

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'mains', name: 'Mains' },
  { id: 'sides', name: 'Sides' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'desserts', name: 'Desserts' },
]

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'bowl-salmon',
    categoryId: 'mains',
    name: 'Salmon rice bowl',
    description: 'Grilled salmon, seasoned rice, pickled cucumber, sesame.',
    priceCents: 1495,
  },
  {
    id: 'curry-chicken',
    categoryId: 'mains',
    name: 'Chicken curry',
    description: 'Slow-cooked chicken, coconut curry, jasmine rice.',
    priceCents: 1295,
  },
  {
    id: 'burger',
    categoryId: 'mains',
    name: 'Classic burger',
    description: 'Beef patty, cheddar, lettuce, tomato, house sauce, brioche.',
    priceCents: 1195,
  },
  {
    id: 'veggie-wrap',
    categoryId: 'mains',
    name: 'Roasted veggie wrap',
    description: 'Hummus, roasted peppers, spinach, warm flatbread.',
    priceCents: 995,
  },
  {
    id: 'fries',
    categoryId: 'sides',
    name: 'Crispy fries',
    description: 'Sea salt, herb aioli on the side.',
    priceCents: 495,
  },
  {
    id: 'salad',
    categoryId: 'sides',
    name: 'Garden salad',
    description: 'Mixed greens, lemon vinaigrette.',
    priceCents: 650,
  },
  {
    id: 'tea',
    categoryId: 'drinks',
    name: 'Iced jasmine tea',
    description: 'Unsweetened, lightly floral.',
    priceCents: 350,
  },
  {
    id: 'soda',
    categoryId: 'drinks',
    name: 'Sparkling yuzu',
    description: 'Chilled, refreshing citrus.',
    priceCents: 395,
  },
  {
    id: 'mochi',
    categoryId: 'desserts',
    name: 'Mochi trio',
    description: 'Matcha, strawberry, vanilla bean.',
    priceCents: 795,
  },
]

export function getMenuItem(id: string): MenuItem | undefined {
  return MENU_ITEMS.find((item) => item.id === id)
}

export function getItemsByCategory(categoryId: string): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.categoryId === categoryId)
}
