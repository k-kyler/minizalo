import { FC } from "react";
import { Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { closeAlert, selectMessage } from "../../redux/AlertSlice";

export const CustomAlert: FC = () => {
  const dispatch = useAppDispatch();

  const message = useAppSelector(selectMessage);

  return (
    <Alert
      onClose={() => dispatch(closeAlert())}
      sx={{
        position: "absolute",
        right: "2rem",
        bottom: "2rem",
        zIndex: 99,
      }}
    >
      {message}
    </Alert>
  );
};
