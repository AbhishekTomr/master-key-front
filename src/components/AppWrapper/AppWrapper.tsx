import "./AppWrapper.scss";
import Auth from "../Auth/Auth";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { useContext, useMemo } from "react";
import { UserContext, IUserContext } from "../../context/user.context";
import { Navigate } from "react-router-dom";
import _ from "lodash";

interface IAppWrapperProps {}

const AppWrapper = ({}: IAppWrapperProps) => {
  const { isLoggedIn } = useContext<IUserContext>(UserContext);

  return (
    <div>
      <Routes>
        {!isLoggedIn && <Route path={`/auth/:authType`} Component={Auth} />}
        {isLoggedIn && <Route path={`/profile`} Component={Profile} />}
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to={"/profile"} />
            ) : (
              <Navigate to={"/auth/login"} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default AppWrapper;
