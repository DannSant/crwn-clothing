import React from 'react'

import {ReactComponent as ShoppingCart} from '../../assets/shopping-bag.svg';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {totggleCartHidden} from '../../redux/cart/cart.actions';

import {selectCartItemsCount} from '../../redux/cart/cart.selectors';

import './cart-icon.styles.scss';

const CartIcon=({totggleCartHidden,itemCount}) =>(
    <div className='cart-icon' onClick={totggleCartHidden}>
        <ShoppingCart className='shopping-icon'></ShoppingCart>
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapDispatchToProps = dispatch =>({
    totggleCartHidden: user=> dispatch(totggleCartHidden())
  });

  const mapStateToProps =createStructuredSelector({
    itemCount: selectCartItemsCount
  })
  

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon);