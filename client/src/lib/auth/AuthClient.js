class AuthClient {
  constructor(config) {
    if (!config) {
      throw Error('AuthClient needs to be provided a config object.');
    }
    this.tokenLocalStorageKey = config.tokenLocalStorageKey || 'token'
    this.userQueryKey = config.userQueryKey || 'users'
    this.loginFn = config.loginFn
  }
}

export default AuthClient;