import React, { useState } from "react";
import Button from "../Common/Button";
import { AuthService } from "../../services/auth.service";

const authService = new AuthService();

interface IGoogleLoginBtn {}

const GoogleLoginBtn = (props: IGoogleLoginBtn) => {
  const [loading, setLoading] = useState<boolean>(false);

  const loginViaGoogle = async () => {
    try {
      setLoading(true);
      const response = await authService.googleLogin();
      console.log("response", response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return <a href="http://localhost:3000/auth/google/login">login via google</a>;
};

export default GoogleLoginBtn;
