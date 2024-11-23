import React, { useContext, useEffect, useState } from "react";
import { AuthService } from "../../services/auth.service";
import { IUser } from "../../types";
import { IUserSignUp } from "../Auth/types";
import { Card } from "@mui/material";
import { Image, Label } from "@mui/icons-material";
import { IUserContext, UserContext } from "../../context/user.context";
import _ from "lodash";
import FileUploader from "../Common/FileUploader";
import "./Profile.scss";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Button from "../Common/Button";
import { Size } from "../../constants";
import EditProfilePopup from "./EditProfilePopup";

const authService = new AuthService();

type Props = {};

const Profile = (props: Props) => {
  const { user, setUser, isLoggedIn } = useContext<IUserContext>(UserContext);
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <div>
      {editMode && (
        <EditProfilePopup
          show={editMode}
          onClose={() => setEditMode(false)}
          user={user}
        />
      )}
      <Card className="profile-card">
        <div className="control">
          <img
            src={user.profileImg}
            alt={`${user?.name[0]?.toLocaleUpperCase() || ""}`}
            style={{ width: 64, height: 64 }} // Optional: Adjust size
            className="profile-pic"
            crossOrigin="anonymous"
          />
        </div>
        <div className="control">
          <div className="value">{user.name}</div>
        </div>
        <div className="control">
          <div className="value">{user.email}</div>
        </div>
        <div className="control">
          <div className="value">{user.user_name}</div>
        </div>
        <div className="control">
          <Button
            size={Size.SMALL}
            className="edit-profile-btn"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
