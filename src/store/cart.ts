import { create } from 'zustand';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    toggleCart: () => void;
    cartTotal: () => number;
    cartCount: () => number;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    isOpen: false,

    addItem: (product) => set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);
        if (existingItem) {
            return {
                items: state.items.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                ),
                isOpen: true, // Auto-open cart when adding items
            };
        }
        return { items: [...state.items, { ...product, quantity: 1 }], isOpen: true };
    }),

    removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
    })),

    updateQuantity: (id, quantity) => set((state) => ({
        items: quantity === 0
            ? state.items.filter((item) => item.id !== id)
            : state.items.map((item) => item.id === id ? { ...item, quantity } : item)
    })),

    toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

    cartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    cartCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
    },

    clearCart: () => set({ items: [] })
}));
