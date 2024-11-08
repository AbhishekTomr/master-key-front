import React, { useContext, useEffect, useState } from "react";
import { AuthService } from "../../services/auth.service";
import { IUser } from "../../types";
import { IUserSignUp } from "../Auth/types";
import { Card } from "@mui/material";
import { Label } from "@mui/icons-material";
import { IUserContext, UserContext } from "../../context/user.context";
import _ from "lodash";

const authService = new AuthService();

type Props = {};

const Profile = (props: Props) => {
  const { user, setUser, isLoggedIn } = useContext<IUserContext>(UserContext);
  // useEffect(() => {
  //   if (!_.isEmpty(isLoggedIn)) return;
  //   authService
  //     .getUserInfo()
  //     .then((user: IUserSignUp) => {
  //       const { first_name, last_name, email } = user;
  //       setUser({ name: `${first_name} ${last_name}`, email });
  //     })
  //     .catch((err) => console.error(err));
  // }, [isLoggedIn]);

  return (
    <div>
      <h1>Profile</h1>
      <Card>
        <div className="control">
          <div className="label">Name : </div>
          <div className="value">{user.name}</div>
        </div>
        <div className="control">
          <div className="label">Email : </div>
          <div className="value">{user.email}</div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
