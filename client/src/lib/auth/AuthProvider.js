// import React, { useEffect, useReducer } from 'react';
// import useStateWithLocalStorage from '../hooks/useStateWithLocalStorage.js';
// import jwt_decode from 'jwt-decode';
//
// import { addUser } from '../services/userService.js';
// import { addTokenViaCredentials, addTokenViaRefreshToken, deleteToken } from '../services/tokenService.js';
//
// import AuthContext from './AuthContext.js';
//
// import { initialState, reducer } from '../state/reducers/authReducer.js';
// import { initUser, updateUser, removeUser } from '../state/actions/authActions.js';
//
// const AuthProvider = ( props ) => {
//   const isTokenValid = (token) => {
//     try {
//       return jwt_decode(token).exp > Math.floor(Date.now()/1000);
//     } catch (err) {
//       return false;
//     }
//   };
//   const getExpFromToken = (token) => {
//     try {
//       return jwt_decode(token).exp;
//     } catch (err) {
//       return null;
//     }
//   };
//
//   //const [isRefreshing, setIsRefreshing] = useState(false);
//   // const [accessToken, setAccessToken] = useStateWithLocalStorage('access_token');
//   // const [refreshToken, setRefreshToken] = useStateWithLocalStorage('refresh_token');
//   const [tokens, setTokens] = useStateWithLocalStorage('tokens', {
//     accessToken: null,
//     refreshToken: null
//   });
//
//   const [{
//     user,
//     isLoading,
//     isAuthenticated
//   }, dispatch] = useReducer(reducer, initialState);
//
//   // useEffect(() => {
//   //   const getUserFromToken = (token) => {
//   //     try {
//   //       return jwt_decode(token).user;
//   //     } catch (err) {
//   //       return null;
//   //     }
//   //   };
//   //
//   //   const u = getUserFromToken(tokens.accessToken);
//   //   if (isLoading) {
//   //     dispatch(initUser(u));
//   //   } else {
//   //     if (u) {
//   //       dispatch(updateUser(u));
//   //     } else {
//   //       dispatch(removeUser());
//   //     }
//   //   }
//   // }, [isLoading, tokens]);
//
//   const getUserFromToken = (token) => {
//     try {
//       return jwt_decode(token).user;
//     } catch (err) {
//       return null;
//     }
//   };
//
//   useEffect(() => {
//     const checkSession = async () => {
//       if (tokens) {
//         if (isTokenValid(tokens.accessToken)) {
//           dispatch(initUser(getUserFromToken(tokens.accessToken)));
//         } else if (isTokenValid(tokens.refreshToken)) {
//           try {
//             const response = await addTokenViaRefreshToken(tokens.refreshToken);
//             const { access_token, refresh_token } = await response.data;
//             setTokens({
//               accessToken: access_token,
//               refreshToken: refresh_token
//             });
//             dispatch(initUser(getUserFromToken(access_token)));
//           } catch (err) {
//             setTokens({
//               accessToken: null,
//               refreshToken: null
//             });
//             dispatch(initUser(null));
//           }
//         } else {
//           dispatch(initUser(null));
//         }
//       } else {
//         dispatch(initUser(null));
//       }
//     };
//     checkSession();
//   }, [tokens]);
//
//   /**
//    * Return access token if valid. If access token invalid, check if refresh
//    * token is valid. If refresh token invalid, logout. If refresh token valid,
//    * get refreshed tokens via api. If server responds with 4XX/5XX error code
//    * on refresh token request, then logout. If server doesn't respond or times
//    * out, throw error for the calling component to handle.
//    */
//   // const getToken = async () => {
//   //   if (isTokenValid(tokens.accessToken)) {
//   //     return tokens.accessToken;
//   //   } else {
//   //     if (isTokenValid(tokens.refreshToken)) {
//   //       try {
//   //         const response = await addTokenViaRefreshToken(tokens.refreshToken);
//   //         const { access_token, refresh_token } = await response.data;
//   //         setTokens({
//   //           accessToken: access_token,
//   //           refreshToken: refresh_token
//   //         });
//   //         return access_token;
//   //       } catch (err) {
//   //         if (err.response) {
//   //           setTokens({
//   //             accessToken: null,
//   //             refreshToken: null
//   //           });
//   //           return null;
//   //         } else {
//   //           throw new Error(err);
//   //         }
//   //       }
//   //     } else {
//   //       setTokens({
//   //         accessToken: null,
//   //         refreshToken: null
//   //       });
//   //       return null;
//   //     }
//   //   }
//   // };
//
//   /**
//    * Return access token if valid. If access token invalid, check if refresh
//    * token is valid. If refresh token invalid, logout. If refresh token valid,
//    * get refreshed tokens via api. If server responds with 4XX/5XX error code
//    * on refresh token request, then logout. If server doesn't respond or times
//    * out, throw error for the calling component to handle.
//    */
//   const getToken = async () => {
//     if (isTokenValid(tokens.accessToken)) {
//       return tokens.accessToken;
//     } else {
//       try {
//         const response = await addTokenViaRefreshToken(tokens.refreshToken);
//         const { access_token, refresh_token } = await response.data;
//         setTokens({
//           accessToken: access_token,
//           refreshToken: refresh_token
//         });
//         dispatch(updateUser(getUserFromToken(access_token)));
//         return access_token;
//       } catch (err) {
//         if (err.response) {
//           setTokens({
//             accessToken: null,
//             refreshToken: null
//           });
//           dispatch(removeUser());
//           return null;
//         } else {
//           throw new Error(err);
//         }
//       }
//     }
//   };
//
//   /**
//    * Get new tokens with login credentials and set token state.
//    */
//   const login = async ( credentials ) => {
//     const response = await addTokenViaCredentials({
//       email: credentials.email,
//       password: credentials.password
//     });
//     const { access_token, refresh_token } = await response.data;
//     setTokens({
//       accessToken: access_token,
//       refreshToken: refresh_token
//     });
//     dispatch(updateUser(getUserFromToken(access_token)));
//   };
//
//   /**
//    * Delete refresh token from DB and clear token state.
//    */
//   const logout = async () => {
//     await deleteToken(tokens.refreshToken);
//     setTokens({
//       accessToken: null,
//       refreshToken: null
//     });
//     dispatch(removeUser());
//   };
//
//   /**
//    * Add user to DB.
//    */
//   const register = async ( userInfo ) => {
//     await addUser({
//       firstName: userInfo.firstName,
//       lastName: userInfo.lastName,
//       email: userInfo.email,
//       password: userInfo.password
//     });
//   };
//
//   return (
//     <>
//       {
//         isLoading
//           ? <></>
//           : <AuthContext.Provider
//               value={{
//                 user,
//                 isAuthenticated,
//                 getToken,
//                 login,
//                 logout,
//                 register
//               }}
//             >
//               { props.children }
//             </AuthContext.Provider>
//       }
//     </>
//   );
// };
//
// export default AuthProvider;


// import React, { useEffect, useReducer, useCallback } from 'react';
// import useStateWithLocalStorage from '../../hooks/useStateWithLocalStorage.js';
// import { useNavigate } from 'react-router-dom';
// import {
//   addUser,
//   deleteUser,
//   updateUser,
//   forgotPassword as forgotUserPassword,
//   resetPassword as resetUserPassword,
//   changePassword as changeUserPassword
// } from '../../services/user-service.js';
// import {
//   addToken,
//   refreshToken,
//   deleteToken
// } from '../../services/auth-service.js';
// import isTokenValid from '../../utils/is-token-valid.js';
// import getUserFromToken from '../../utils/get-user-from-token.js';
// import handleError from '../../utils/handle-error.js';
// import AuthContext from './AuthContext.js';
// import { initialState, reducer } from './state/reducer.js';
// import { initCurrentUser, updateCurrentUser, removeCurrentUser } from './state/actions.js';
// import useUser from '../../hooks/queries/useUser.js';


// const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [token, setToken] = useStateWithLocalStorage('accessToken', '');

//   const [{
//     user,
//     isLoading,
//     isAuthenticated
//   }, dispatch] = useReducer(reducer, initialState);

//   // const { data: currUser } = useCurrentUser(token, {
//   //   enabled: !!token && !isLoading
//   // });
//   // console.log(currUser);
//   const { data: currUser } = useUser(
//     getUserFromToken(token)?._id,
//     {
//       enabled: !!token && !isLoading
//     }
//   );
//   console.log(currUser);

//   useEffect(() => {
//     const checkSession = async () => {
//       if (!token) {
//         dispatch(initCurrentUser(null));
//         return;
//       }
//       if (isTokenValid(token)) {
//         dispatch(initCurrentUser(getUserFromToken(token)));
//         return;
//       }
//       try {
//         const { access_token } = await refreshToken();
//         setToken(access_token);
//         dispatch(initCurrentUser(getUserFromToken(access_token)));
//       } catch (err) {
//         if (err.response?.status === 500) {
//           dispatch(initCurrentUser(getUserFromToken(token)));
//         } else {
//           setToken('');
//           dispatch(initCurrentUser(null));
//         }
//       }
//       return;
//     };
//     if (isLoading) {
//       checkSession();
//     }
//   }, [token, isLoading]);

//   /**
//    * Return access token if valid. If access token is invalid, try to get
//    * refreshed token from server. If server responds with 4XX/5XX error code
//    * on refresh token request, then logout. If server doesn't respond or times
//    * out, throw error for the calling component to handle.
//    */
//   const getToken = useCallback(async () => {
//     if (isTokenValid(token)) {
//       return token;
//     }
//     try {
//       const { access_token } = await refreshToken();
//       setToken(access_token);
//       dispatch(updateCurrentUser(getUserFromToken(access_token)));
//       return access_token;
//     } catch (err) {
//       if (err.response?.status === 500) {
//         console.log(err);
//         throw new Error(handleError(err));
//       } else {
//         setToken('');
//         dispatch(removeCurrentUser());
//         return null;
//       }
//     }
//   }, [token, setToken]);

//   /**
//    * Get new token with login credentials and set token and user state.
//    */
//   const login = useCallback(async ({ credentials, opts }) => {
//     const { access_token } = await addToken(credentials);
//     setToken(access_token);
//     dispatch(updateCurrentUser(getUserFromToken(access_token)));
//     navigate(opts?.redirectTo || '/');
//     return;
//   }, [setToken, navigate]);

//   /**
//    * Delete refresh token from server and clear token and user state.
//    */
//   const logout = useCallback(async (opts) => {
//     await deleteToken();
//     setToken(null);
//     dispatch(removeCurrentUser());
//     if (opts?.returnTo) {
//       navigate(opts?.returnTo);
//     }
//     return;
//   }, [setToken, navigate]);

//   /**
//    * Add user.
//    */
//   const register = useCallback(async ({ userInfo, opts }) => {
//     const newUser = await addUser(userInfo);
//     return newUser;
//   }, []);

//   /**
//    * Update user.
//    */
//   const updateAccount = useCallback(async ({ user: u }) => {
//     console.log(u);
//     const t = await getToken();
//     const updatedUser = await updateUser({ user: u, token: t });
//     return updatedUser;
//   }, [getToken]);

//   /**
//    * Change password.
//    */
//   const changePassword = useCallback(async ({ passwords }) => {
//     await changeUserPassword({ passwords, getToken });
//   }, [getToken]);

//   /**
//    * Reset password.
//    */
//   const resetPassword = useCallback(async ({ passwords, token }) => {
//     await resetUserPassword({ passwords, token });
//   }, []);

//   /**
//    * Forgot password.
//    */
//   const forgotPassword = useCallback(async ({ email }) => {
//     await forgotUserPassword(email);
//   }, []);

//   /**
//    * Delete user.
//    */
//   const deleteAccount = useCallback(async ({ opts }) => {
//     const userId = user._id;
//     await deleteUser({ userId, getToken });
//     if (opts?.returnTo) {
//       navigate.push(opts?.returnTo);
//     }
//   }, [user, getToken, navigate]);

//   return (
//     <>
//       {isLoading
//         ? <></>
//         : <AuthContext.Provider
//             value={{
//               user,
//               isAuthenticated,
//               getToken,
//               login,
//               logout,
//               register,
//               updateAccount,
//               deleteAccount,
//               changePassword,
//               forgotPassword,
//               resetPassword
//             }}
//           >
//             {children}
//           </AuthContext.Provider>
//       }
//     </>
//   );
// };

// export default AuthProvider;



import React, { useState, useEffect, useCallback } from 'react';
import useStateWithLocalStorage from '../../hooks/useStateWithLocalStorage.js';
import { useNavigate } from 'react-router-dom';
import {
  addUser,
  deleteUser,
  updateUser,
  forgotPassword as forgotUserPassword,
  resetPassword as resetUserPassword,
  changePassword as changeUserPassword
} from '../../services/user-service.js';
import {
  addToken,
  refreshToken,
  deleteToken
} from '../../services/auth-service.js';
import isTokenValid from '../../utils/is-token-valid.js';
import getUserIdFromToken from '../../utils/get-user-id-from-token.js';
import handleError from '../../utils/handle-error.js';
import AuthContext from './AuthContext.js';
import useUser from '../../hooks/queries/useUser.js';

const AuthProvider = ({ client, children }) => {
  if (!client) {
    throw Error('AuthProvider must be used with an AuthClient.');
  }
  console.log(client);
  const navigate = useNavigate();
  const [token, setToken] = useStateWithLocalStorage('token', '');
  const [isInitializing, setIsInitializing] = useState(true);

  const {
    data: user,
    isLoading: isUserLoading
  } = useUser(
    getUserIdFromToken(token), {
      enabled: !!token && !isInitializing
    }
  );

  useEffect(() => {
    const initAuth = async () => {
      try {
        await getToken();
      } catch(err) {
        console.error(err);
      }
      return;
    };
    if (isInitializing) {
      initAuth();
      setIsInitializing(false);
    }
  }, []);

  /**
   * Return access token if valid. If access token is invalid, try to get
   * refreshed token from server. If server responds with 4XX/5XX error code
   * on refresh token request, then logout. If server doesn't respond or times
   * out, throw error for the calling component to handle.
   */
  const getToken = useCallback(async () => {
    if (token && isTokenValid(token)) {
      console.log('valid token');
      return token;
    }
    try {
      const { access_token } = await refreshToken();
      setToken(access_token);
      return access_token;
    } catch (err) {
      setToken('');
      throw new Error(handleError(err));
    }
  }, [token, setToken]);

  /**
   * Get new token with login credentials and set token and user state.
   */
  const login = useCallback(async ({ credentials, opts }) => {
    const { access_token } = await addToken(credentials);
    setToken(access_token);
    navigate(opts?.redirectTo || '/');
    return;
  }, [setToken, navigate]);

  /**
   * Delete refresh token from server and clear token and user state.
   */
  const logout = useCallback(async (opts) => {
    await deleteToken();
    setToken('');
    if (opts?.returnTo) {
      navigate(opts?.returnTo);
    }
    return;
  }, [setToken, navigate]);

  /**
   * Add user.
   */
  const register = useCallback(async ({ userInfo, opts }) => {
    const newUser = await addUser(userInfo);
    return newUser;
  }, []);

  /**
   * Update user.
   */
  const updateAccount = useCallback(async ({ user: u }) => {
    const t = await getToken();
    const updatedUser = await updateUser({ user: u, token: t });
    return updatedUser;
  }, [getToken]);

  /**
   * Change password.
   */
  const changePassword = useCallback(async ({ passwords }) => {
    await changeUserPassword({ passwords, getToken });
  }, [getToken]);

  /**
   * Reset password.
   */
  const resetPassword = useCallback(async ({ passwords, token }) => {
    await resetUserPassword({ passwords, token });
  }, []);

  /**
   * Forgot password.
   */
  const forgotPassword = useCallback(async ({ email }) => {
    await forgotUserPassword(email);
  }, []);

  /**
   * Delete user.
   */
  const deleteAccount = useCallback(async ({ opts }) => {
    const userId = user._id;
    await deleteUser({ userId, getToken });
    if (opts?.returnTo) {
      navigate.push(opts?.returnTo);
    }
  }, [user, getToken, navigate]);

  return (
    <>
      {isInitializing || isUserLoading
        ? <></>
        : <AuthContext.Provider
            value={{
              user,
              isAuthenticated: !!user,
              getToken,
              login,
              logout,
              register,
              updateAccount,
              deleteAccount,
              changePassword,
              forgotPassword,
              resetPassword
            }}
          >
            {children}
          </AuthContext.Provider>
      }
    </>
  );
};

export default AuthProvider;