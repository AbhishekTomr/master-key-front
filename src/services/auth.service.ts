import _ from "lodash";
import { IUserLogin, IUserSignUp } from "../components/Auth/types";
import { responseHandler } from "../helpers/responseHandler";
import { IUser } from "../types";

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
      body: JSON.stringify({ ...userSignUpData, profile_img: "" }),
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

  async uploadFile(file: any) {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const requestOptions = {
        method: "POST",
        credentials: "include",
        body: formData,
      };
      return fetch(
        `${this.endpoint}/auth/profile`,
        requestOptions as RequestInit
      ).then(responseHandler);
    } catch (err) {}
  }

  async updateUserProfile(user: IUser) {
    const formData = new FormData();
    formData.append("user_name", user.user_name);
    formData.append("profile_img", user.profileImg as string);

    const requestOptions = {
      method: "POST",
      credentials: "include",
      body: formData,
    };
    return fetch(
      `${this.endpoint}/auth/profile`,
      requestOptions as RequestInit
    ).then(responseHandler);
  }

  async updatePassword(passwordInfo: {
    current_password: string;
    updated_password: string;
  }) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(passwordInfo),
    };
    return fetch(
      `${this.endpoint}/auth/update-password`,
      requestOptions as RequestInit
    ).then(responseHandler);
  }

  async verifyEmail(email: string) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: email }),
    };
    return fetch(
      `${this.endpoint}/auth/verify/email`,
      requestOptions as RequestInit
    ).then(responseHandler);
  }

  async verifyOTP(email: string, otp: string) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, otp }),
    };
    return fetch(
      `${this.endpoint}/auth/verify/otp`,
      requestOptions as RequestInit
    ).then(responseHandler);
  }

  async resetPassword(new_password: string) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ new_password }),
    };
    return fetch(
      `${this.endpoint}/auth/verify/reset-password`,
      requestOptions as RequestInit
    ).then(responseHandler);
  }
}
