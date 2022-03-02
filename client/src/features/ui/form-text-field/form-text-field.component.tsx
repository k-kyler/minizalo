import { FC, RefObject } from "react";
import { TextField } from "@mui/material";

interface IFormTextField {
  errorMessage?: string;
  ref?: RefObject<HTMLInputElement>;
  type: string;
  label: string;
}

export const FormTextField: FC<IFormTextField> = ({
  errorMessage,
  ref,
  type,
  label,
}) => {
  return (
    <TextField
      error={errorMessage?.toLowerCase().includes("email")}
      helperText={errorMessage?.toLowerCase().includes("email") && errorMessage}
      inputRef={ref}
      label={label}
      variant="standard"
      sx={{ width: "100%" }}
      type={type}
    />
  );
};
