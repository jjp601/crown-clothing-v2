import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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

export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, cartItemToAdd) => {
    const newCartItems = addCartItem(cartItems, cartItemToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
} 
