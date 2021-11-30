export const addItemToCart = (cartItems, cartItemToAdd) => {
    const exisitingCartItem = cartItems.find( 
        cartItem => cartItem.id === cartItemToAdd.id
    );

    if(exisitingCartItem){
       return cartItems.map( 
            cartItem => cartItem.id == cartItemToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        )
    }

    return [...cartItems, {...cartItemToAdd ,quantity: 1 }]
}

export const removeItem = (cartItems, cartItemToRemove) =>{
    const exisitingCartItem = cartItems.find(cartItem => 
        cartItem.id === cartItemToRemove.id
    );

    if(exisitingCartItem.quantity === 1){
        return cartItems.filter(cartItem =>
            cartItem.id !== cartItemToRemove.id
        );
    }

    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id ?
            {...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );

}