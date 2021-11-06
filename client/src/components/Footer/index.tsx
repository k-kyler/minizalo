import { Typography } from "@mui/material";
import { FC } from "react";
import "./Footer.css";

export const Footer: FC = () => {
  return (
    <div className="footer">
      <Typography variant="body2" color="GrayText">
        © 2021. MiniZalo by KKL Team. All rights reserved.
      </Typography>
    </div>
  );
};
