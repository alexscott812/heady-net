import { ACTIONS } from '../actions/registerActions.js';

const initialState = {
  isLoading: false,
  error: null,
  isError: false,
  isSuccess: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SUBMIT_INIT: {
      return {
        ...state,
        isLoading: true,
        error: null,
        isError: false,
        isSuccess: false
      };
    }
    case ACTIONS.SUBMIT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true
      };
    }
    case ACTIONS.SUBMIT_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        isError: true
      };
    }
    default: {
      return {
        state
      };
    }
  }
};

export { initialState, reducer };
