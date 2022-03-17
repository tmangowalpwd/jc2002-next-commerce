import { cart_types } from "../types"

const init_state = {
  items: []
}

export const cart_reducer = (state = init_state, action) => {
  if (action.type === cart_types.ADD_ITEM) {
    const newItems = [...state.items]
    newItems.push(action.payload)

    return {
      ...state,
      items: newItems
    }
  } else if (action.type === cart_types.DELETE_ITEM) {
    const items = [...state.items]
    items.splice(action.payload, 1)

    return {
      ...state,
      items,
    }
  } else if (action.type === cart_types.EDIT_QTY) {
    const items = [...state.items]
    items[action.payload.idx].quantity = action.payload.quantity

    return {
      ...state,
      items
    }
  } else if (action.type === cart_types.GET_USER_CART) {
    return {
      ...state,
      items: action.payload
    }
  }

  return state
}