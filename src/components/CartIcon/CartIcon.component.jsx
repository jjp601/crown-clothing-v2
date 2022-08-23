import { useContext } from 'react';

import { CartContext } from '../../context/Cart.context';

import { ShoppingIcon, CartIconContainer, ItemCount } from './CartIcon.styles';

const CartIcon = () => {
    const { isCartOpen ,setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;