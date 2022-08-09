import { ACTIONS } from '../actions/showsActions.js';

const initialState = {
  shows: [],
  totalResults: 0,
  hasMore: false,
  page: 1,
  isLoading: true,
  error: null,
  retryCount: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_SHOWS_INIT: {
      return {
        ...state,
        hasMore: false,
        isLoading: true,
        error: null
      }
    }
    case ACTIONS.FETCH_SHOWS_SUCCESS: {
      return {
        ...state,
        shows: [...state.shows, ...action.payload.shows],
        totalResults: action.payload.totalResults,
        hasMore: action.payload.hasMore,
        isLoading: false,
        error: null
      }
    }
    case ACTIONS.FETCH_SHOWS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    }
    case ACTIONS.RESET_SHOWS: {
      return {
        ...state,
        shows: [],
        totalResults: 0,
        hasMore: false,
        page: 1
      }
    }
    case ACTIONS.INCREMENT_PAGE: {
      return {
        ...state,
        page: state.page + 1
      }
    }
    case ACTIONS.RETRY_FETCH: {
      return {
        ...state,
        retryCount: state.retryCount + 1
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
