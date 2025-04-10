import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    openCart: () => void,
    closeCart: () => void,
    getItemQuantity: (id: number) => number,
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    cartQuantity: number,
    cartItems: CartItem[],
    isOpen: boolean
}

type CartItem = {
    id: number,
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])
    const [isOpen, setIsOpen] = useState(false)

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id == id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        setCartItems(prevItems => {
            // if item does not exist in the cart then add that into cart
            if (prevItems.find(item => item.id === id) == null) {
                return [...prevItems, { id, quantity: 1 }]
            }
            // if already exists then increase the quantity of the item
            else {
                return prevItems.map((item) => item.id == id ? { ...item, quantity: item.quantity + 1 } : item)
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(prevItems => {
            // if quantity is 1 and want to remove it from the cart
            if (prevItems.find(item => item.id === id)?.quantity === 1) {
                return prevItems.filter(item => item.id !== id)
            }
            // if already exists then decrease the quantity of the item
            else {
                return prevItems.map((item) => item.id == id ? { ...item, quantity: item.quantity - 1 } : item)
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(prevItems => {
            return prevItems.filter(item => item.id !== id)
        })
    }

    return <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart, isOpen }}>
        {children}
        <ShoppingCart />
    </ShoppingCartContext.Provider>
}