import { ACTIONS } from './actions.js';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INIT_CURRENT_USER: {
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: !!action.payload.user,
        isLoading: false
      }
    }
    case ACTIONS.UPDATE_CURRENT_USER: {
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: !!action.payload.user
      }
    }
    case ACTIONS.REMOVE_CURRENT_USER: {
      return {
        ...state,
        user: null,
        isAuthenticated: false
      }
    }
    default: {
      return {
        state
      }
    }
  }
};

export { initialState, reducer };
