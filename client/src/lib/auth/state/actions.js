const ACTIONS = {
  INIT_CURRENT_USER: 'INIT_CURRENT_USER',
  UPDATE_CURRENT_USER: 'UPDATE_CURRENT_USER',
  REMOVE_CURRENT_USER: 'REMOVE_CURRENT_USER'
};

const initCurrentUser = (user) => {
  return {
    type: ACTIONS.INIT_CURRENT_USER,
    payload: {
      user
    }
  }
};

const updateCurrentUser = (user) => {
  return {
    type: ACTIONS.UPDATE_CURRENT_USER,
    payload: {
      user
    }
  }
};

const removeCurrentUser = () => {
  return {
    type: ACTIONS.REMOVE_CURRENT_USER
  }
};

export {
  ACTIONS,
  initCurrentUser,
  updateCurrentUser,
  removeCurrentUser
};
