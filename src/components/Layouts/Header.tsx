import React, { useCallback, useContext, useEffect } from "react";
import "./Header.scss";
import { emptyUser, UserContext } from "../../context/user.context";
import { Box, AppBar, Toolbar, IconButton } from "@mui/material";
import Button from "../Common/Button";
import _ from "lodash";
import { AuthService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { setLocalStorage } from "../../helpers/localStorage";
import { IS_LOGGED_IN } from "../../constants";

const authService = new AuthService();

interface IHeader {}

const Header = (props: IHeader) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    authService
      .logout()
      .then((res) => {
        setIsLoggedIn(false);
        navigate("/auth/login");
      })
      .catch((err) => console.error());
  }, [authService]);

  return (
    <Box sx={{ flexGrow: 1 }} className={"header-wrap"}>
      <AppBar
        position="static"
        sx={{
          marginBottom: "10px",
        }}
        className={"app-bar"}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
          className="toolbar"
        >
          {
            isLoggedIn && (
              <Button
                className="inherit-btn toolbar-btn logout"
                onClick={logout}
              >
                Logout
              </Button>
            )
            // ) : (
            //   <IconButton
            //     size="large"
            //     aria-label="account of current user"
            //     aria-controls="menu-appbar"
            //     aria-haspopup="true"
            //     onClick={() => {}}
            //     color="inherit"
            //   >
            //     <AccountCircle />
            //   </IconButton>
            // )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
