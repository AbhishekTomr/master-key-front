import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Header.scss";
import { UserContext } from "../../context/user.context";
import { Box, AppBar, Toolbar, IconButton } from "@mui/material";
import Button from "../Common/Button";
import _ from "lodash";
import { AuthService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { VpnKey as Icon } from "@mui/icons-material";

const authService = new AuthService();

interface IHeader {}

const Header = (props: IHeader) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setLoading(true);
    authService
      .logout()
      .then((res) => {
        setIsLoggedIn(false);
        navigate("/auth/login");
      })
      .catch((err) => console.error())
      .finally(() => setLoading(false));
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
            justifyContent: "space-between",
          }}
          className="toolbar"
        >
          <IconButton onClick={() => navigate("/")}>
            <Icon
              sx={{
                color: "#ffffff",
                fontSize: "30px",
                width: "40px",
              }}
            />
          </IconButton>
          {
            isLoggedIn && (
              <Button
                className="inherit-btn toolbar-btn logout"
                onClick={logout}
                isLoading={loading}
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
