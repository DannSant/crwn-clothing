//React
import React from 'react';
import { Link } from "react-router-dom";
import { auth } from '../../firebase/firebase.utils';

//Redux
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';

//Components
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/crown.svg';

const Header =({currentUser,hidden})=>(
    <div className='header'>       
        <Link className='logo-container' to='/'>
            <Logo className='logo'></Logo>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/contact'>CONTACT</Link>
           

            {
                currentUser ? 
                    <div className='option' onClick={()=> auth.signOut()}> Sign Out</div>
                :
                     <Link className='option' to='/signin'>SIGN IN</Link>
            }

            
<CartIcon></CartIcon>
        </div>
        {
            hidden ? null : (<CartDropdown></CartDropdown>)
        }
       
    </div>
);

const mapStateToProps =  createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden:selectCartHidden
})

export default connect(mapStateToProps)(Header);