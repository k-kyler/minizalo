import { Skeleton } from "@mui/material";

export const FallbackMessage = () => {
  return (
    <Skeleton variant="rectangular" animation="wave" width={400} height={230} />
  );
};
