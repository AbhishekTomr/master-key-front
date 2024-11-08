import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Auth.scss";
import TextFields from "../Common/TextFields";
import { Card, Typography } from "@mui/material";
import Button from "../Common/Button";
import { AuthService } from "../../services/auth.service";
import { IUserLogin, IUserSignUp } from "./types";
import { AuthType } from "./constant";
import { Link } from "react-router-dom";
import { IUserContext, UserContext } from "../../context/user.context";
import { Exception } from "sass";
import { IResponseHandlerWrapper } from "../../helpers/responseHandler";

const authService = new AuthService();

type Props = {};

const Auth = (props: Props) => {
  const { authType } = useParams();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { setIsLoggedIn } = useContext<IUserContext>(UserContext);

  const resetState = () => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
  };

  const formType: AuthType = useMemo(() => {
    return authType === AuthType.SINGUP ? AuthType.SINGUP : AuthType.LOGIN;
  }, [authType]);

  const navigate = useNavigate();

  const handleFormSubmit = useCallback(
    async (formType: AuthType) => {
      //TODO : add some validation

      if (formType === AuthType.SINGUP) {
        const formData = {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        };
        authService
          .signUp(formData as IUserSignUp)
          .then((res: IResponseHandlerWrapper) => {
            resetState();
            navigate("/auth/login");
          })
          .catch((err) => console.error(err));
      }
      if (formType === AuthType.LOGIN) {
        const formData = {
          email,
          password,
        };
        authService
          .login(formData as IUserLogin)
          .then((res: IResponseHandlerWrapper) => {
            setIsLoggedIn(true);
            resetState();
            navigate("/profile");
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    [firstName, lastName, email, password, confirmPassword, formType]
  );

  return (
    <Card className="form-wrapper">
      <Typography
        variant={"h6"}
        className="form-heading"
      >{`User ${formType}`}</Typography>
      <form className="form-container">
        {formType === AuthType.SINGUP && (
          <>
            <TextFields
              id={"first_name"}
              label={"First Name"}
              value={firstName}
              onChange={setFirstName}
              error={"hey check this out"}
            />
            <TextFields
              id={"last_name"}
              label={"Last Name"}
              value={lastName}
              onChange={setLastName}
              error={"hey check this out"}
            />
          </>
        )}
        <TextFields
          id={"email"}
          label={"Email"}
          value={email}
          onChange={setEmail}
          error={"hey check this out"}
        />
        <TextFields
          id={"password"}
          label={"Password"}
          value={password}
          onChange={setPassword}
          error={"hey check this out"}
        />
        {formType === AuthType.SINGUP && (
          <TextFields
            id={"confirm password"}
            label={"Confirm Password"}
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={"hey check this out"}
          />
        )}
        <Button
          className="submit-btn"
          onClick={() => handleFormSubmit(formType)}
        >
          {formType}
        </Button>
        <div className="link-wrap">
          <Link
            className="link switch-link"
            to={formType === AuthType.LOGIN ? "/auth/signup" : "/auth/login"}
          >
            {formType === AuthType.LOGIN ? "Sign Up" : "Login"}
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default Auth;
