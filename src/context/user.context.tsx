import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IUser } from "../types";
import _, { isEmpty } from "lodash";
import { AuthService } from "../services/auth.service";
import { IResponseHandlerWrapper } from "../helpers/responseHandler";
import { getCookie } from "../helpers/cookie";
import { AUTH_COOKIE_NAME } from "../constants";

const authService = new AuthService();

export const emptyUser: IUser = {
  name: "",
  email: "",
  user_name: "",
  profileImg: "",
};

export interface IUserContext {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  reloadUser: boolean;
  setRealoadUser: Dispatch<SetStateAction<boolean>>;
}

const initialState = {
  user: emptyUser,
  setUser: _.noop,
  isLoggedIn: false,
  setIsLoggedIn: _.noop,
  reloadUser: false,
  setRealoadUser: _.noop,
};

export const UserContext = createContext<IUserContext>(initialState);

interface IUserContextProvider {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: IUserContextProvider) => {
  const [user, setUser] = useState<IUser>(emptyUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [reloadUser, setRealoadUser] = useState<boolean>(
    initialState.reloadUser
  );

  const setUserInfo = async (isLoggedIn: boolean) => {
    try {
      if (!isLoggedIn) return setUser(emptyUser);
      const { status, data: user }: IResponseHandlerWrapper =
        await authService.getUserInfo();
      if (!status) return;

      setUser({
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        user_name: user.user_name,
        profileImg: user?.profile_img || emptyUser.profileImg,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setRealoadUser(false);
    }
  };

  useEffect(() => {
    setUserInfo(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    setUserInfo(isLoggedIn);
  }, [reloadUser]);

  useEffect(() => {
    //for the first time fetch it from localStorage
    const loggedInCookie = getCookie(AUTH_COOKIE_NAME);
    setIsLoggedIn(!isEmpty(loggedInCookie));
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        reloadUser,
        setRealoadUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
