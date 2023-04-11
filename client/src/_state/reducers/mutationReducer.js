import { ACTIONS } from "../actions/mutationActions.js";

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.MUTATE_INIT: {
      return {
        ...state,
        data: null,
        isLoading: true,
        isError: false,
        error: null,
      };
    }
    case ACTIONS.MUTATE_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: true,
      };
    }
    case ACTIONS.MUTATE_ERROR: {
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: true,
        error: action.payload.error,
        isSuccess: false,
      };
    }
    case ACTIONS.RESET_MUTATION: {
      return {
        data: null,
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
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
