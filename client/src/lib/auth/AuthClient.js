class AuthClient {
  constructor(config) {
    if (!config) {
      throw Error("AuthClient needs to be provided a config object.");
    }
    this.tokenLocalStorageKey = config.tokenLocalStorageKey || "token";
    this.loginFn = config.loginFn;
    this.refreshTokenFn = config.refreshTokenFn;
    this.logoutFn = config.logoutFn;
    this.navigateFn = config.navigateFn;
  }
}

export default AuthClient;
