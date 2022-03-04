import { forwardRef, HTMLInputTypeAttribute } from "react";
import { TextField } from "@mui/material";

interface IFormTextField {
  errorMessage?: string;
  errorType: "username" | "email" | "password";
  type: HTMLInputTypeAttribute;
  label: string;
}

export const FormTextField = forwardRef<HTMLInputElement, IFormTextField>(
  ({ errorMessage, errorType, type, label }, ref) => {
    return (
      <TextField
        error={errorMessage?.toLowerCase().includes(errorType)}
        helperText={
          errorMessage?.toLowerCase().includes(errorType) && errorMessage
        }
        inputRef={ref}
        label={label}
        variant="standard"
        sx={{ width: "100%" }}
        type={type}
      />
    );
  }
);
