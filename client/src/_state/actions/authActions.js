const ACTIONS = {
  INIT_USER: "INIT_USER",
  UPDATE_USER: "UPDATE_USER",
  REMOVE_USER: "REMOVE_USER",
};

const initUser = (user) => {
  return {
    type: ACTIONS.INIT_USER,
    payload: {
      user,
    },
  };
};

const updateUser = (user) => {
  return {
    type: ACTIONS.UPDATE_USER,
    payload: {
      user,
    },
  };
};

const removeUser = () => {
  return {
    type: ACTIONS.REMOVE_USER,
  };
};

export { ACTIONS, initUser, updateUser, removeUser };
