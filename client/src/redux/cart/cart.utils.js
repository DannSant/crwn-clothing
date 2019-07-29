export const addUniqueItemToCart = (cartItems,cartItemToAdd) => {
    const existingCartItem = cartItems.find( cartItem =>cartItem.id ===cartItemToAdd.id);
    if(existingCartItem){
        return cartItems.map(cartItem => cartItem.id===cartItemToAdd.id ? {...cartItem,quantity:cartItem.quantity + 1} : cartItem);
    } else {
        return [...cartItems,{...cartItemToAdd,quantity:1}];
    }

}

export const clearItemFromCart = (cartItems,itemToRemove) => {
    return  cartItems.filter((item,idx)=>item.id!==itemToRemove.id)
}

export const removeItemFromCart = (cartItems,itemToRemove) => {
    const existingCartItem = cartItems.find( cartItem =>cartItem.id ===itemToRemove.id);
    if(existingCartItem.quantity>1){
        return cartItems.map(cartItem => cartItem.id===itemToRemove.id ? {...cartItem,quantity:cartItem.quantity - 1} : cartItem);
    } else {
        return cartItems.filter((item,idx)=>item.id!==itemToRemove.id)
    }

}