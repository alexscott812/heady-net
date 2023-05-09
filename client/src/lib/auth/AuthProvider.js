import React, { useState, useEffect } from 'react';
import useStateWithLocalStorage from '../../hooks/useStateWithLocalStorage.js';
import isTokenValid from '../../utils/is-token-valid.js';
import getUserFromToken from '../../utils/get-user-from-token.js';
// import { initialState, reducer } from './state/authReducer.js';
// import { initUser, updateUser, removeUser } from './state/authActions.js';
import AuthContext from './AuthContext.js';
// import { useNavigate } from "react-router-dom";

const AuthProvider = ({ client, children }) => {
  if (!client) {
    throw Error('AuthProvider must be used with an AuthClient.');
  }

  const { tokenLocalStorageKey, loginFn, refreshTokenFn, logoutFn } = client;

  // const navigate = useNavigate();
  // const [{
  //   // user,
  //   isInitializing,
  //   isAuthenticated
  // }, dispatch] = useReducer(reducer, initialState);
  const [isInitializing, setIsInitializing] = useState(true);
  const [token, setToken] = useStateWithLocalStorage(tokenLocalStorageKey, '');
  // const [user, setUser] = useState(() => getUserFromToken(token));

  useEffect(() => {
    const initAuth = async () => {
      try {
        await getToken();
      } catch (err) {
        console.error(err);
      }
      //dispatch(initUser(getUserFromToken(token)));
      setIsInitializing(false);
      return;
    };
    if (isInitializing) {
      initAuth();
    }
  }, []);

  /**
   * Return access token if valid. If access token is invalid, try to get
   * refreshed token from server. If server responds with 4XX/5XX error code
   * on refresh token request, then logout. If server doesn't respond or times
   * out, throw error for the calling component to handle.
   */
  const getToken = async () => {
    if (!token) {
      throw Error('No token!');
    }
    if (isTokenValid(token)) {
      return token;
    }
    try {
      const { access_token } = await refreshTokenFn();
      setToken(access_token);
      return access_token;
    } catch (err) {
      setToken('');
      throw Error(err);
    }
  };

  /**
   * Get new token with login credentials and set token and user state.
   */
  const login = async ({ credentials, opts }) => {
    const { access_token } = await loginFn(credentials);
    setToken(access_token);
    // if (opts?.redirectTo) {
    //   navigateFn(opts?.redirectTo);
    // }
    return;
  };

  /**
   * Delete refresh token from server and clear token and user state.
   */
  const logout = async (opts) => {
    await logoutFn();
    setToken('');
    // if (opts?.returnTo) {
    //   navigateFn(opts?.returnTo);
    // }
    return;
  };

  // /**
  //  * Add user.
  //  */
  // const register = useCallback(async ({ userInfo, opts }) => {
  //   const newUser = await addUser(userInfo);
  //   return newUser;
  // }, []);

  // /**
  //  * Update user.
  //  */
  // const updateAccount = useCallback(async ({ user: u }) => {
  //   const t = await getToken();
  //   const updatedUser = await updateUser({ user: u, token: t });
  //   return updatedUser;
  // }, [getToken]);

  // /**
  //  * Change password.
  //  */
  // // const changePassword = useCallback(async ({ passwords }) => {
  // //   await changeUserPassword({ passwords, getToken });
  // // }, [getToken]);

  // const changePasswordMutation = useMutation(changeUserPassword);

  // /**
  //  * Reset password.
  //  */
  // const resetPassword = useCallback(async ({ passwords, token }) => {
  //   await resetUserPassword({ passwords, token });
  // }, []);

  // /**
  //  * Forgot password.
  //  */
  // const forgotPassword = useCallback(async ({ email }) => {
  //   await forgotUserPassword(email);
  // }, []);

  // /**
  //  * Delete user.
  //  */
  // const deleteAccount = useCallback(async ({ opts }) => {
  //   const userId = user._id;
  //   await deleteUser({ userId, getToken });
  //   if (opts?.returnTo) {
  //     navigate.push(opts?.returnTo);
  //   }
  // }, [user, getToken, navigate]);

  const user = getUserFromToken(token);
  const isAuthenticated = !!user;

  return (
    <>
      {isInitializing ? (
        <></>
      ) : (
        <AuthContext.Provider
          value={{
            user,
            isAuthenticated,
            getToken,
            login,
            logout
            // register,
            // updateAccount,
            // deleteAccount,
            // changePassword: changePasswordMutation,
            // forgotPassword,
            // resetPassword
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export default AuthProvider;
