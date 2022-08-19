import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, product) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === product.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            return cartItem.id === product.id 
            ? {...cartItem, quantity: cartItem.quantity + 1} 
            : cartItem
        })
    }

    return [...cartItems, { ...product, quantity: 1 }]
}

const removeCartItem = (cartItems, product) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === product.id)

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== product.id)
    }

    return cartItems.map((cartItem) => {
        return cartItem.id === product.id 
        ? {...cartItem, quantity: cartItem.quantity - 1} 
        : cartItem
    })
}

const clearCartItem = (cartItems, product) => {
    return cartItems.filter((cartItem) => cartItem.id !== product.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});



export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0)

        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price
        }, 0)

        setCartTotal(newCartTotal)
    }, [cartItems])

    const addItemToCart = (product) => {
        setCartItems(addCartItem(cartItems, product));
    }

    const removeItemFromCart = (product) => {
        setCartItems(removeCartItem(cartItems, product));
    }

    const clearItemFromCart = (product) => setCartItems(clearCartItem(cartItems, product));

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart,
        clearItemFromCart,
        cartItems, 
        cartCount,
        cartTotal
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}