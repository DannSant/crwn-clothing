//React
import React from 'react';

//Redux
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {signOutStart} from '../../redux/user/user.actions';

//Components
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';


import {ReactComponent as Logo} from '../../assets/crown.svg';
import {HeaderContainer,LogoContainer,OptionsContainer,OptionLink} from './header.styles';

const Header =({currentUser,hidden,signOutStart})=>(
    <HeaderContainer>       
        <LogoContainer to='/'>
            <Logo></Logo>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            <OptionLink to='/contact'>CONTACT</OptionLink>           

            {
                currentUser ? 
                    <OptionLink as='div' onClick={signOutStart}> Sign Out</OptionLink>
                :
                     <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            
            <CartIcon></CartIcon>
        </OptionsContainer>
        {
            hidden ? null : (<CartDropdown></CartDropdown>)
        }
       
    </HeaderContainer>
);

const mapStateToProps =  createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden:selectCartHidden
})

const mapDispatchToProps = dispatch =>({
    signOutStart: ()=>dispatch(signOutStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);