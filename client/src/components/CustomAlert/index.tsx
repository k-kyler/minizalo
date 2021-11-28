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
      variant="outlined"
      onClose={() => dispatch(closeAlert())}
      sx={{
        position: "absolute",
        right: "1rem",
        bottom: "1rem",
        zIndex: 99,
      }}
    >
      {message}
    </Alert>
  );
};
