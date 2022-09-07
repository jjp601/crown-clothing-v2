import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

import CartIcon from "../../components/CartIcon/CartIcon.component";
import CartDropdown from "../../components/CartDropdown/CartDropdown.component";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";


import { NavbarContainer, LogoContainer, NavLinks, NavLink } from "./Navbar.styles";

const Navbar = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutUser = () => dispatch(signOutStart());

    return (
      <Fragment>
        <NavbarContainer>
            <LogoContainer to='/'>
                <CrownLogo className='logo' />
            </LogoContainer>
            <NavLinks>
                <NavLink to="/shop">
                    SHOP
                </NavLink>
                {
                    currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to="/signin">
                            SIGN IN
                        </NavLink>
                    )
                }
                <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown />}
        </NavbarContainer>
        <Outlet />
      </Fragment>
    )
  }

  export default Navbar;