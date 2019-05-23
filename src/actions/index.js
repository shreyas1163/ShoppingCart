// Action Creaters
export const shoppingCart = cart => {
    return {
        type: 'Load_CART',
        payload: cart
    };
};