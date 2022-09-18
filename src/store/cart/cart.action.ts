import { CategoryItem } from "../categories/categories.types";
import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

const addCartItem = (cartItems: CartItem[], product: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], product: CartItem): CartItem[] => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === product.id)

    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== product.id)
    }

    return cartItems.map((cartItem) => {
        return cartItem.id === product.id 
        ? {...cartItem, quantity: cartItem.quantity - 1} 
        : cartItem
    })
}

const clearCartItem = (cartItems: CartItem[], product: CartItem): CartItem[] => {
    return cartItems.filter((cartItem) => cartItem.id !== product.id)
}

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
})

export const addItemToCart = (cartItems: CartItem[], cartItemToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, cartItemToAdd);
    return setCartItems(newCartItems);
}

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);
}

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return setCartItems(newCartItems);
} 
