import { Typography, Link } from "@mui/material";
import { FC } from "react";
import "./Footer.css";

export const Footer: FC = () => {
  return (
    <div className="footer">
      <Typography variant="h5" color="GrayText" gutterBottom>
        © 2021 MiniZalo by KKL Team. All rights reserved
      </Typography>
      <Typography variant="subtitle1" color="GrayText" gutterBottom>
        Contact us if there are any issues through our{" "}
        <Link
          href="https://github.com/k-kyler/minizalo"
          target="__blank"
          underline="none"
        >
          GitHub repository
        </Link>
      </Typography>
      <Typography variant="subtitle1" color="GrayText">
        Illustrations by{" "}
        <Link href="https://storyset.com/web" target="__blank" underline="none">
          Storyset
        </Link>
      </Typography>
    </div>
  );
};
