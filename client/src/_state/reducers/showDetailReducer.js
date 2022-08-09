import { ACTIONS } from '../actions/showDetailActions.js';

const initialState = {
  show: null,
  isLoading: true,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_SHOW_INIT: {
      return {
        show: null,
        isLoading: true,
        error: null
      }
    }
    case ACTIONS.FETCH_SHOW_SUCCESS: {
      return {
        show: action.payload.show,
        isLoading: false,
        error: null
      }
    }
    case ACTIONS.FETCH_SHOW_ERROR: {
      return {
        show: null,
        isLoading: false,
        error: action.payload.error
      }
    }
    case ACTIONS.ADD_REVIEW: {
      return {
        show: null,
        isLoading: false,
        error: action.payload.error
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
