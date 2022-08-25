import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}
const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({ children }) => {
    const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);


    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0)

        const newCartTotal = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price
        }, 0)

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { 
                cartItems: newCartItems, 
                cartTotal: newCartTotal, 
                cartCount: newCartCount 
            })
        )
    }

    const addItemToCart = (product) => {
        const newCartItems = addCartItem(cartItems, product);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (product) => {
        const newCartItems = removeCartItem(cartItems, product);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (product) => {
        const newCartItems = clearCartItem(cartItems, product);
        updateCartItemsReducer(newCartItems);
    } 

    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
        )
    }

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