import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FormControl,
  OutlinedInput as Input,
  InputLabel,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import "./TextFields.scss";
import _ from "lodash";
interface ITextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (key: string, value: string) => void;
  className?: string;
  error: string;
  isPassword?: boolean;
}

const TextFields = ({
  id,
  label,
  className,
  value,
  onChange,
  error,
  isPassword = false,
}: ITextInputProps) => {
  const timerRef = useRef<any>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const { value } = event.target;
      onChange(id, value);
    }, 300);
  };

  if (isPassword) {
    return (
      <FormControl className={`text-form-control ${className}`}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Input
          id={id}
          onChange={onTextChange}
          label={label}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={() => setShowPassword((oldState) => !oldState)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {!_.isEmpty(error) && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    );
  }

  return (
    <FormControl className={`text-form-control ${className}`}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input id={id} onChange={onTextChange} label={label} />
      {!_.isEmpty(error) && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
};

export default TextFields;
