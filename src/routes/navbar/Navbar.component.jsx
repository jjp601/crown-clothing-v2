import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

import { UserContext } from "../../context/User.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import './Navbar.styles.scss';

const Navbar = () => {
    const { currentUser } = useContext(UserContext);

    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrownLogo className='logo' />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>
                {
                    currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                    ) : (
                        <Link className="nav-link" to="/signin">
                            SIGN IN
                        </Link>
                    )
                }
            </div>
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navbar;