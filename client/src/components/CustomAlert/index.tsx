import { FC } from "react";
import { Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { closeAlert, selectMessage } from "../../redux/AlertSlice";

export const CustomAlert: FC = () => {
  const dispatch = useAppDispatch();

  const message = useAppSelector(selectMessage);

  setTimeout(() => {
    dispatch(closeAlert());
  }, 3000);

  return (
    <Alert
      variant="standard"
      onClose={() => dispatch(closeAlert())}
      sx={{
        position: "absolute",
        right: "1rem",
        bottom: "1rem",
        zIndex: 99,
        boxShadow:
          "rgb(0 0 0 / 10%) 0px 1px 3px 0px, rgb(0 0 0 / 6%) 0px 1px 2px 0px",
      }}
    >
      {message}
    </Alert>
  );
};
