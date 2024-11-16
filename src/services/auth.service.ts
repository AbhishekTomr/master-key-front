import { IUserLogin, IUserSignUp } from "../components/Auth/types";
import { responseHandler } from "../helpers/responseHandler";

export class AuthService {
  private readonly endpoint: string;
  constructor() {
    this.endpoint = process.env.REACT_APP_BACKEND_DOMAIN || "";
  }

  async signUp(userSignUpData: IUserSignUp): Promise<any> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userSignUpData),
    };
    return fetch(
      `${this.endpoint}/auth/signup`,
      requestOptions as RequestInit
    ).then(responseHandler);
  }

  async login(userLoginData: IUserLogin): Promise<any> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userLoginData),
    };
    return fetch(
      `${this.endpoint}/auth/login`,
      requestOptions as RequestInit
    ).then(responseHandler);
  }

  async googleLogin() {
    window.location.href = `${this.endpoint}/auth/google/login`;
  }

  async getUserInfo(): Promise<any> {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    return fetch(
      `${this.endpoint}/auth/get-user-info`,
      requestOptions as RequestInit
    ).then(responseHandler);
  }

  async logout(): Promise<any> {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };
    return fetch(
      `${this.endpoint}/auth/logout`,
      requestOptions as RequestInit
    ).then(responseHandler);
  }

  async verifyUserName(user_name: string) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ user_name }),
    };
    return fetch(
      `${this.endpoint}/auth/verify/username`,
      requestOptions as RequestInit
    ).then(responseHandler);
  }
}
