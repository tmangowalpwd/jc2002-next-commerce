import { auth_types } from "../types"

const init_state = {
  id: 0,
  username: "",
  email: "",
  fullName: ""
}

export const auth_reducer = (state = init_state, action) => {
  if (action.type === auth_types.LOGIN_USER) {
    return {
      ...state,
      username: action.payload.username,
      email: action.payload.email,
      fullName: action.payload.fullName,
      id: action.payload.id,
    }
  } else if (action.type === auth_types.LOGOUT_USER) {
    return init_state
  }

  return state
}