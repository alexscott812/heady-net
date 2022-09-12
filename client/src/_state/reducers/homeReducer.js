import { ACTIONS } from '../actions/homeActions.js';

const initialState = {
  todaysShowsCount: null,
  isTodaysShowsCountLoading: true,
  isTodaysShowsCountError: false,
  todaysShowsCountError: null,
  recentActivity: [],
  recentActivityPage: 1,
  recentActivityHasMore: false,
  isRecentActivityLoading: true,
  isRecentActivityError: false,
  recentActivityError: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_TODAYS_SHOWS_INIT: {
      return {
        ...state,
        isTodaysShowsCountLoading: true,
        isTodaysShowsCountError: false,
        todaysShowsCountError: null
      };
    }
    case ACTIONS.FETCH_TODAYS_SHOWS_SUCCESS: {
      return {
        ...state,
        todaysShowsCount: action.payload.todaysShowsCount,
        isTodaysShowsCountLoading: false
      };
    }
    case ACTIONS.FETCH_TODAYS_SHOWS_ERROR: {
      return {
        ...state,
        todaysShowsCount: null,
        isTodaysShowsCountLoading: false,
        isTodaysShowsCountError: true,
        todaysShowsCountError: action.payload.todaysShowsError
      };
    }
    case ACTIONS.FETCH_RECENT_ACTIVITY_INIT: {
      return {
        ...state,
        recentActivityHasMore: false,
        isRecentActivityLoading: true,
        isRecentActivityError: false,
        recentActivityError: null
      };
    }
    case ACTIONS.FETCH_RECENT_ACTIVITY_SUCCESS: {
      return {
        ...state,
        recentActivity: [...state.recentActivity, ...action.payload.recentActivity],
        recentActivityHasMore: action.payload.recentActivityHasMore,
        isRecentActivityLoading: false,
      };
    }
    case ACTIONS.FETCH_RECENT_ACTIVITY_ERROR: {
      return {
        ...state,
        isRecentActivityLoading: false,
        isRecentActivityError: true,
        recentActivityError: action.payload.recentActivityError
      };
    }
    case ACTIONS.INCREMENT_RECENT_ACTIVITY_PAGE: {
      return {
        ...state,
        recentActivityPage: state.recentActivityPage + 1
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
