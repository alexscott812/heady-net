import { ACTIONS } from "../actions/queryActions.js";

const initialState = {
  data: null,
  isLoading: true,
  isError: false,
  error: null,
  retryCount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_INIT: {
      return {
        ...state,
        data: null,
        isLoading: true,
        isError: false,
        error: null,
      };
    }
    case ACTIONS.FETCH_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        isError: false,
        error: null,
      };
    }
    case ACTIONS.FETCH_ERROR: {
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: true,
        error: action.payload.error,
      };
    }
    case ACTIONS.RETRY_FETCH: {
      return {
        ...state,
        retryCount: state.retryCount + 1,
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
