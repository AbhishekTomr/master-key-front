import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./Profile.scss";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import TextFields from "../Common/TextFields";
import { IUserContext, UserContext } from "../../context/user.context";
import { IUser } from "../../types";
import _, { isEmpty } from "lodash";
import { AuthService } from "../../services/auth.service";
import {
  IResponseHandlerWrapper,
  responseHandler,
} from "../../helpers/responseHandler";
import { IValue } from "../Auth/types";
import FileUploader from "../Common/FileUploader";
import "./Profile.scss";
import Button from "../Common/Button";
import { Size } from "../../constants";

const authService = new AuthService();

interface IEditProfilePopup {
  user: IUser;
  show: boolean;
  onClose: () => void;
}

const EditProfilePopup = ({ user, show, onClose }: IEditProfilePopup) => {
  const [userName, setUserName] = useState<{
    value: string;
    error: string;
  }>({ value: user?.user_name || "", error: "" });
  const [userNameAvailMessage, setUserNameAvailMessage] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string>("");
  const { setRealoadUser } = useContext(UserContext);

  useEffect(() => {
    setUserName({ value: user.user_name, error: "" });
  }, [user.user_name, show]);

  const validateField = (key: string, value: string) => {
    switch (key) {
      case "user_name":
        return isEmpty(value) ? "value must not be empty" : null;
      default:
        return null;
    }
  };

  const onValueChange = (key: string, value: string) => {
    const isValid = validateField(key, value);
    switch (key) {
      case "user_name":
        return setUserName({ value, error: !isValid ? "" : isValid });
      default:
        break;
    }
  };

  useEffect(() => {
    if (_.isEqual(userName.value, user.user_name))
      return setUserNameAvailMessage("current user name.");
    if (!userName.value.length) return;
    setUserNameAvailMessage("");
    authService
      .verifyUserName(userName.value)
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
        setUserNameAvailMessage("user name is available!!!");
      });
  }, [userName.value]);

  const updateProfile = () => {
    const updatedProfile = {
      ...user,
      user_name: userName.value,
      profileImg: profileImg,
    };
    authService
      .updateUserProfile(updatedProfile)
      .then((newUser) => {
        setRealoadUser(true);
        onClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Dialog open={show} onClose={onClose} className="edit-profile">
      <DialogTitle className="title">Edit Profile</DialogTitle>
      <DialogContent className="content">
        <DialogActions className="dialog-action">
          <FileUploader onChange={(file: any) => setProfileImg(file)} />
        </DialogActions>
        <DialogActions className="dialog-action">
          <TextFields
            id={"user_name"}
            label={"User Name"}
            value={userName.value}
            onChange={onValueChange}
            error={userName.error}
            successText={userNameAvailMessage}
          />
        </DialogActions>
        <DialogActions className="dialog-action">
          <Button
            onClick={updateProfile}
            size={Size.LARGE}
            className="full-width"
          >
            Update User Profile
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfilePopup;
