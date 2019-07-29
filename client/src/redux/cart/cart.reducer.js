import {CartActionType} from './cart.types';
import {addUniqueItemToCart,clearItemFromCart,removeItemFromCart} from './cart.utils';

const INITIAL_STATE = {
    hidden:true,
    cartItems: []
};

const cartReducer = (state=INITIAL_STATE,action) =>{
   
    switch (action.type) {
        case CartActionType.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden:!state.hidden
            }
        case CartActionType.ADD_ITEM:
            
            return {
                ...state,
                cartItems: addUniqueItemToCart(state.cartItems, action.payload)
            }
        case CartActionType.CLEAR_ITEM:
            return {
                ...state,
                cartItems: clearItemFromCart(state.cartItems, action.payload)
            }

        case CartActionType.REMOVE_ITEM:
                return {
                    ...state,
                    cartItems: removeItemFromCart(state.cartItems, action.payload)
                };
        case CartActionType.CLEAR_CART:
                return {
                    ...state,
                    cartItems: []
                }
        default:
            return state;

    }
}

export default cartReducer;