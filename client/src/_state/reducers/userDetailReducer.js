import { ACTIONS } from "../actions/userDetailActions.js";

const initialState = {
  user: null,
  isUserLoading: true,
  error: null,
  recentActivity: [],
  recentActivityPage: 1,
  recentActivityHasMore: false,
  isRecentActivityLoading: true,
  recentActivityError: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_USER_INIT: {
      return {
        ...state,
        user: null,
        isUserLoading: true,
        userError: null,
      };
    }
    case ACTIONS.FETCH_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        isUserLoading: false,
        userError: null,
      };
    }
    case ACTIONS.FETCH_USER_ERROR: {
      return {
        ...state,
        user: null,
        isUserLoading: false,
        userError: action.payload.error,
      };
    }
    case ACTIONS.FETCH_RECENT_ACTIVITY_INIT: {
      return {
        ...state,
        recentActivityHasMore: false,
        isRecentActivityLoading: true,
        recentActivityError: null,
      };
    }
    case ACTIONS.FETCH_RECENT_ACTIVITY_SUCCESS: {
      return {
        ...state,
        recentActivity: [
          ...state.recentActivity,
          ...action.payload.recentActivity,
        ],
        recentActivityHasMore: action.payload.recentActivityHasMore,
        isRecentActivityLoading: false,
        recentActivityError: null,
      };
    }
    case ACTIONS.FETCH_RECENT_ACTIVITY_ERROR: {
      return {
        ...state,
        isRecentActivityLoading: false,
        recentActivityError: action.payload.recentActivityError,
      };
    }
    case ACTIONS.RESET_RECENT_ACTIVITY: {
      return {
        ...state,
        recentActivity: [],
        totalResults: 0,
        hasMore: false,
        page: 1,
      };
    }
    case ACTIONS.INCREMENT_RECENT_ACTIVITY_PAGE: {
      return {
        ...state,
        recentActivityPage: state.recentActivityPage + 1,
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
