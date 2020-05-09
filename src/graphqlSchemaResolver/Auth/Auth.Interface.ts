export interface ILoginCred {
  /**
   * Username of user
   */
  username: string;
  /**
   * Password of user
   */
  password: string;
}

export interface IAuth {
  /**
   * Token for login user
   */
  token: string;
}
