export interface IUserSignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  identifier: string;
  password: string;
}
