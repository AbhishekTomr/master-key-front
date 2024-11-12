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
import { IResponseHandlerWrapper } from "../../helpers/responseHandler";
import { isEmail, isEmpty } from "validator";
import _ from "lodash";
import { setLocalStorage } from "../../helpers/localStorage";
import { IS_LOGGED_IN } from "../../constants";

const authService = new AuthService();

interface IValue {
  value: string;
  error: string;
}

type Props = {};

const emptyState: IValue = {
  value: "",
  error: "",
};

const Auth = ({}: Props) => {
  const { authType } = useParams();
  const [firstName, setFirstName] = useState<IValue>(emptyState);
  const [lastName, setLastName] = useState<IValue>(emptyState);
  const [password, setPassword] = useState<IValue>(emptyState);
  const [email, setEmail] = useState<IValue>(emptyState);
  const [username, setUserName] = useState<IValue>(emptyState);
  const [identifier, setIdentifier] = useState<IValue>(emptyState);
  const [confirmPassword, setConfirmPassword] = useState<IValue>(emptyState);
  const { setIsLoggedIn } = useContext<IUserContext>(UserContext);
  const [loading, setLoading] = useState<boolean>(false);

  const resetState = () => {
    setFirstName(emptyState);
    setLastName(emptyState);
    setPassword(emptyState);
    setEmail(emptyState);
    setConfirmPassword(emptyState);
  };

  const validateField = (key: string, value: string) => {
    switch (key) {
      case "first_name":
      case "last_name":
      case "password":
      case "user_name":
      case "identifier":
        return isEmpty(value) ? "value must not be empty" : null;
      case "email":
        if (isEmpty(value)) return "value must not be empty";
        return isEmail(value) ? null : "must be a valid email";
      case "confirm_password":
        if (isEmpty(value)) return "value must not be empty";
        return value === password.value ? null : "passwords do not match";
      default:
        return null;
    }
  };

  const formType: AuthType = useMemo(() => {
    return authType === AuthType.SINGUP ? AuthType.SINGUP : AuthType.LOGIN;
  }, [authType]);

  const navigate = useNavigate();

  const validForm = useMemo(() => {
    const hasValues = !isEmpty(identifier.value) && !isEmpty(password.value);
    const noErrors = isEmpty(identifier.error) && isEmpty(password.error);
    if (formType === AuthType.LOGIN) {
      return hasValues && noErrors;
    }
    const hasValueSignUp =
      !isEmpty(email.value) &&
      !isEmpty(password.value) &&
      !isEmpty(firstName.value) &&
      !isEmpty(lastName.value) &&
      !isEmpty(username.value) &&
      !isEmpty(confirmPassword.value);
    const noErrorSignUp =
      isEmpty(email.error) &&
      isEmpty(password.error) &&
      isEmpty(firstName.error) &&
      isEmpty(lastName.error) &&
      isEmpty(username.error) &&
      isEmpty(confirmPassword.error);
    return hasValueSignUp && noErrorSignUp;
  }, [
    firstName,
    lastName,
    email,
    password,
    username,
    confirmPassword,
    formType,
    identifier,
  ]);

  const onValueChange = (key: string, value: string) => {
    const isValid = validateField(key, value);
    switch (key) {
      case "first_name":
        return setFirstName({ value, error: !isValid ? "" : isValid });
      case "last_name":
        return setLastName({ value, error: !isValid ? "" : isValid });
      case "email":
        return setEmail({ value, error: !isValid ? "" : isValid });
      case "user_name":
        return setUserName({ value, error: !isValid ? "" : isValid });
      case "password":
        return setPassword({ value, error: !isValid ? "" : isValid });
      case "confirm_password":
        return setConfirmPassword({ value, error: !isValid ? "" : isValid });
      case "identifier":
        return setIdentifier({ value, error: !isValid ? "" : isValid });
      default:
        break;
    }
  };

  const handleFormSubmit = useCallback(
    async (formType: AuthType) => {
      //TODO : add some validation
      setLoading(true);
      if (formType === AuthType.SINGUP) {
        const formData = {
          first_name: firstName.value,
          last_name: lastName.value,
          email: email.value,
          password: password.value,
          user_name: username.value,
        };
        authService
          .signUp(formData as IUserSignUp)
          .then((res: IResponseHandlerWrapper) => {
            resetState();
            navigate("/auth/login");
          })
          .catch((err) => console.error(err))
          .finally(() => setLoading(false));
      }
      if (formType === AuthType.LOGIN) {
        const formData = {
          identifier: identifier.value,
          password: password.value,
        };
        authService
          .login(formData as IUserLogin)
          .then((res: IResponseHandlerWrapper) => {
            setIsLoggedIn(true);
            resetState();
            setLocalStorage(IS_LOGGED_IN, true);
            navigate("/profile");
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => setLoading(false));
      }
    },
    [firstName, lastName, email, password, confirmPassword, formType]
  );

  useEffect(() => {
    if (!username.value.length) return;
    authService
      .verifyUserName(username.value)
      .then(({ data }: IResponseHandlerWrapper) => {
        const { status, message } = data;
        if (!status)
          return setUserName((oldState: IValue) => ({
            ...oldState,
            error: message,
          }));
        setUserName((oldState: IValue) => ({
          ...oldState,
          error: "",
        }));
      });
  }, [username.value]);

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
              value={firstName.value}
              onChange={onValueChange}
              error={firstName.error}
            />
            <TextFields
              id={"last_name"}
              label={"Last Name"}
              value={lastName.value}
              onChange={onValueChange}
              error={lastName.error}
            />
            <TextFields
              id={"email"}
              label={"Email"}
              value={email.value}
              onChange={onValueChange}
              error={email.error}
            />
            <TextFields
              id={"user_name"}
              label={"User Name"}
              value={username.value}
              onChange={onValueChange}
              error={username.error}
              successText={
                !_.isEmpty(username.value) && _.isEmpty(username.error)
                  ? "username avaiable!!!"
                  : ""
              }
            />
          </>
        )}
        {formType !== AuthType.SINGUP && (
          <TextFields
            id={"identifier"}
            label={"Email or Username"}
            value={identifier.value}
            onChange={onValueChange}
            error={identifier.error}
          />
        )}
        <TextFields
          id={"password"}
          label={"Password"}
          value={password.value}
          onChange={onValueChange}
          error={password.error}
          isPassword={true}
        />
        {formType === AuthType.SINGUP && (
          <TextFields
            id={"confirm_password"}
            label={"Confirm Password"}
            value={confirmPassword.value}
            onChange={onValueChange}
            error={confirmPassword.error}
            isPassword={true}
          />
        )}
        <Button
          className="submit-btn"
          onClick={() => handleFormSubmit(formType)}
          disabled={!validForm}
          isLoading={loading}
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
