export interface IUser {
  name: string;
  email: string;
  user_name: string;
  profileImg: string;
}

export enum InputColor {
  SUCCESS = "success",
  ERROR = "error",
  PRIMARY = "primary",
}

export enum EDIT_TYPES {
  EDIT_PROFILE = "edit_profile",
  CHANGE_PASSWORD = "change_password",
  NONE = "none",
}

export enum ForgotPassSteps {
  EMAIL_VERIFICATION = 1,
  OTP_VERIFICATION = 2,
  NEW_PASSWORD = 3,
  DONE = 4,
}
