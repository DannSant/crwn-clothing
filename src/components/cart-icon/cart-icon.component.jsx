import React from 'react'

import {ReactComponent as ShoppingCart} from '../../assets/shopping-bag.svg';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {totggleCartHidden} from '../../redux/cart/cart.actions';

import {selectCartItemsCount} from '../../redux/cart/cart.selectors';

import {
  CartContainer,
  ShoppingIcon,
  ItemCountContainer
} from './cart-icon.styles';

const CartIcon=({totggleCartHidden,itemCount}) =>(
  <CartContainer onClick={totggleCartHidden}>
    <ShoppingIcon />
    <ItemCountContainer>{itemCount}</ItemCountContainer>
  </CartContainer>
);

const mapDispatchToProps = dispatch =>({
    totggleCartHidden: user=> dispatch(totggleCartHidden())
  });

  const mapStateToProps =createStructuredSelector({
    itemCount: selectCartItemsCount
  })
  

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);