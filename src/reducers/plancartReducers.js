import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS,
} from '../constants/plancartConstants'



export const plancartReducer = (state = { plancartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      return {
        ...state,
        plancartItems: [item]
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        plancartItems: state.plancartItems.filter(x => x.product !== action.payload)
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      }

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      }

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        plancartItems: []
      }

    default:
      return state
  }
}