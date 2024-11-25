import React, { useEffect, useMemo, useState } from "react";
import "./Auth.scss";
import { ForgotPassSteps } from "../../types";
import TextFields from "../Common/TextFields";
import { Card } from "@mui/material";
import { IValue } from "./types";
import isEmail from "validator/lib/isEmail";
import { isEmpty } from "lodash";
import Button from "../Common/Button";
import { MuiOtpInput } from "mui-one-time-password-input";
import { AuthService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const authService = new AuthService();

type Props = {};

const ForgotPassForm = (props: Props) => {
  const [step, setStep] = useState<ForgotPassSteps>(
    ForgotPassSteps.EMAIL_VERIFICATION
  );
  const [email, setEmail] = useState<IValue>({ value: "", error: "" });
  const [newPassword, setNewPassword] = useState<IValue>({
    value: "",
    error: "",
  });
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const submitBtnText = useMemo(() => {
    switch (step) {
      case ForgotPassSteps.EMAIL_VERIFICATION:
        return "Verify Email";
      case ForgotPassSteps.OTP_VERIFICATION:
        return "Verify Otp";
      default:
        return "Set New Password";
    }
  }, [step]);

  const resetPassword = async () => {
    try {
      if (step === ForgotPassSteps.EMAIL_VERIFICATION) {
        //perform email verification and send code to email
        const response = await authService.verifyEmail(email.value);
        console.log(response);
        setStep(ForgotPassSteps.OTP_VERIFICATION);
      }
      if (step === ForgotPassSteps.OTP_VERIFICATION) {
        const response = await authService.verifyOTP(email.value, otp);
        setStep(ForgotPassSteps.NEW_PASSWORD);
        //verify otp code
      }
      if (step === ForgotPassSteps.NEW_PASSWORD) {
        const response = await authService.resetPassword(newPassword.value);
        setStep(ForgotPassSteps.DONE);
        //update new password
      }
    } catch (err) {
      console.error(err);
    }
  };

  const validateField = (key: string, value: string) => {
    if (isEmpty(value)) return "feild cannot be empty";
    switch (key) {
      case "email": {
        if (!isEmail(value)) return "enter a valid email";

        return "";
      }
      default:
        return "";
    }
  };

  useEffect(() => {
    if (step === ForgotPassSteps.DONE) {
      navigate("/auth/login");
    }
  }, [step]);

  const onValueChange = (key: string, value: string) => {
    const error = validateField(key, value);
    switch (key) {
      case "email":
        return setEmail({ value, error });
      case "new-password":
        return setNewPassword({ value, error });
      default:
        return;
    }
  };

  return (
    <div className="forgot-pass-wrap">
      <Card className="forgot-pass-form">
        <h3 className="title">Forgot Pass ? Reset Your Password </h3>
        <form action="#">
          {step === ForgotPassSteps.EMAIL_VERIFICATION && (
            <TextFields
              id="email"
              value={email.value}
              className="text-field"
              onChange={onValueChange}
              label="Registered Email"
              error={email.error}
            />
          )}
          {step === ForgotPassSteps.OTP_VERIFICATION && (
            <MuiOtpInput
              length={6}
              value={otp}
              onChange={(value) => {
                setOtp(value);
              }}
              className="otp-input"
            />
          )}
          {step === ForgotPassSteps.NEW_PASSWORD && (
            <TextFields
              id="new-password"
              value={newPassword.value}
              className="text-field"
              isPassword={true}
              onChange={onValueChange}
              label="New Password"
              error={newPassword.error}
            />
          )}
          <Button onClick={resetPassword}>{submitBtnText}</Button>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassForm;
