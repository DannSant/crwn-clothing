import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {addItem,clearItem,removeItem} from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem,addItem,clearItem,removeItem}) => {
   
    return (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={cartItem.imageUrl} alt='item' />
        </div>
        <span className='name'>{cartItem.name}</span>
        <span className='quantity'>
            <div onClick={()=>removeItem(cartItem)} className='arrow'>&#10094;</div>
            <span className='value'>{cartItem.quantity}</span>
            <div onClick={()=>addItem(cartItem)} className='arrow'>&#10095;</div>
        </span>
        <span className='price'>{cartItem.price}</span>
        <div className='remove-button' onClick={()=>clearItem(cartItem)}>
            &#10006;
        </div>
    </div>
)}

const mapDispatchToProps = dispatch =>({
    clearItem: item=> dispatch(clearItem(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem:item => dispatch(removeItem(item))
  });

export default connect(null,mapDispatchToProps)(CheckoutItem);