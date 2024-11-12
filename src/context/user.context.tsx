import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IUser } from "../types";
import _ from "lodash";
import { AuthService } from "../services/auth.service";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";
import { IS_LOGGED_IN } from "../constants";
import { IResponseHandlerWrapper } from "../helpers/responseHandler";

const authService = new AuthService();

export const emptyUser: IUser = {
  name: "",
  email: "",
};

export interface IUserContext {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const initialState = {
  user: emptyUser,
  setUser: _.noop,
  isLoggedIn: false,
  setIsLoggedIn: _.noop,
};

export const UserContext = createContext<IUserContext>(initialState);

interface IUserContextProvider {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: IUserContextProvider) => {
  const [user, setUser] = useState<IUser>(emptyUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const setUserInfo = async (isLoggedIn: boolean) => {
    try {
      if (!isLoggedIn) return setUser(emptyUser);
      const { status, data: user }: IResponseHandlerWrapper =
        await authService.getUserInfo();
      if (!status) return;

      setUser({
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setUserInfo(isLoggedIn);
    // setLocalStorage(IS_LOGGED_IN, isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    //for the first time fetch it from localStorage
    const isLoggedIn = getLocalStorage(IS_LOGGED_IN);
    setIsLoggedIn(isLoggedIn);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
