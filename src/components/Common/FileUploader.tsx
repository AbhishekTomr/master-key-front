import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface fileUpload {
  onChange: any;
}

export default function FileUploader({ onChange }: fileUpload) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload Picture
      <VisuallyHiddenInput
        type="file"
        onChange={(event) =>
          onChange(event.target.files ? event.target.files[0] : null)
        }
        accept=".jpeg, .jpg, .png"
      />
    </Button>
  );
}
