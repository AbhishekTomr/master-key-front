import Button from "../Common/Button";
import { AuthService } from "../../services/auth.service";
import { Google } from "@mui/icons-material";
import { Size } from "../../constants";
import "./GoogleLoginBtn.scss";

const authService = new AuthService();

interface IGoogleLoginBtn {}

const GoogleLoginBtn = (props: IGoogleLoginBtn) => {
  return (
    <Button
      onClick={() => authService.googleLogin()}
      size={Size.LARGE}
      className={"google-login-btn"}
    >
      <span className="google-icon">
        <Google />
      </span>{" "}
      login via google
    </Button>
  );
};

export default GoogleLoginBtn;
