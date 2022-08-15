import { useContext } from 'react';

import { CartContext } from '../../context/Cart.context';

import Button from '../Button/Button.component';
import CartItem from '../CartItem/CartItem.component';

import './CartDropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);


    return (
        <div className='cart-dropdown-container'>
            <div className="cart-item">
                {cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)}
            </div>
            <Button>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;