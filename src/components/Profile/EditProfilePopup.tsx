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
import { EDIT_TYPES, IUser } from "../../types";
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
  editMode: EDIT_TYPES;
}

const EditProfilePopup = ({
  user,
  show,
  onClose,
  editMode,
}: IEditProfilePopup) => {
  const [userName, setUserName] = useState<IValue>({
    value: user?.user_name || "",
    error: "",
  });
  const [userNameAvailMessage, setUserNameAvailMessage] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string>("");
  const { setRealoadUser } = useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState<IValue>({
    value: "",
    error: "",
  });
  const [newPassword, setNewPassword] = useState<IValue>({
    value: "",
    error: "",
  });

  useEffect(() => {
    setUserName({ value: user.user_name, error: "" });
  }, [user.user_name, show]);

  const validateField = (key: string, value: string) => {
    switch (key) {
      case "user_name":
      case "current_password":
      case "new_password":
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
      case "current_password":
        return setCurrentPassword({ value, error: !isValid ? "" : isValid });
      case "new_password":
        return setNewPassword({ value, error: !isValid ? "" : isValid });
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
      .then(() => {
        setRealoadUser(true);
        onClose();
      })
      .catch((err) => console.error(err));
  };

  const updatePassword = () => {
    const updatePassword = {
      current_password: currentPassword.value,
      updated_password: newPassword.value,
    };
    authService
      .updatePassword(updatePassword)
      .then(() => {
        setRealoadUser(true);
        onClose();
      })
      .catch((err) => console.error);
  };

  return (
    <Dialog open={show} onClose={onClose} className="edit-profile">
      <DialogTitle className="title">
        {editMode === EDIT_TYPES.EDIT_PROFILE
          ? "Edit Profile"
          : "Update Password"}
      </DialogTitle>
      <DialogContent className="content">
        {editMode === EDIT_TYPES.EDIT_PROFILE ? (
          <>
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
          </>
        ) : (
          <>
            {" "}
            <DialogActions className="dialog-action">
              <TextFields
                id={"current_password"}
                label={"Current Password"}
                value={currentPassword.value}
                onChange={onValueChange}
                error={currentPassword.error}
                isPassword={true}
              />
            </DialogActions>
            <DialogActions className="dialog-action">
              <TextFields
                id={"new_password"}
                label={"New Password"}
                value={newPassword.value}
                onChange={onValueChange}
                error={newPassword.error}
                isPassword={true}
              />
            </DialogActions>
            <DialogActions className="dialog-action">
              <Button
                onClick={updatePassword}
                size={Size.LARGE}
                className="full-width"
              >
                Update Password
              </Button>
            </DialogActions>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfilePopup;
