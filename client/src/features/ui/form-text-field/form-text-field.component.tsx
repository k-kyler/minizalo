import { FC, RefObject, HTMLInputTypeAttribute } from "react";
import { TextField } from "@mui/material";

interface IFormTextField {
  errorMessage?: string;
  errorType: "username" | "email" | "password";
  type: HTMLInputTypeAttribute;
  ref?: RefObject<HTMLInputElement>;
  label: string;
}

export const FormTextField: FC<IFormTextField> = ({
  errorMessage,
  errorType,
  type,
  ref,
  label,
}) => {
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
};
