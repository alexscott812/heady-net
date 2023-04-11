import { ACTIONS } from "./authActions.js";

const initialState = {
  user: null,
  isAuthenticated: false,
  isInitializing: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INIT_USER: {
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: !!action.payload.user,
        isInitializing: false,
      };
    }
    case ACTIONS.UPDATE_USER: {
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: !!action.payload.user,
      };
    }
    case ACTIONS.REMOVE_USER: {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }
    default: {
      return {
        state,
      };
    }
  }
};

export { initialState, reducer };
