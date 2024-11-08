import React from "react";
import { FormControl, OutlinedInput as Input, InputLabel } from "@mui/material";
import "./TextFields.scss";
import _ from "lodash";
interface ITextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error: string;
}

const TextFields = ({
  id,
  label,
  className,
  value,
  onChange,
  error,
}: ITextInputProps) => {
  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <FormControl className={`text-form-control ${className}`}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        // size="small"
        id={id}
        value={value}
        onChange={onTextChange}
        label={label}
      />
      {/* {!_.isEmpty(error) && <FormHelperText error>{error}</FormHelperText>} */}
    </FormControl>
  );
};

export default TextFields;
