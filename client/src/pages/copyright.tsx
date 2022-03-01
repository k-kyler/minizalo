import { FC, useEffect } from "react";
import "./copyright.style.css";
import { Typography, Link } from "@mui/material";
import CopyrightImage from "@assets/copyright.png";
import { useRedirect } from "@hooks/use-redirect";

export const Copyright: FC = () => {
  const { setPathnameHandler } = useRedirect();

  useEffect(setPathnameHandler, []);

  return (
    <div className="copyright">
      <img src={CopyrightImage} className="copyright__image" />

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
        Additional resources from{" "}
        <Link href="https://storyset.com/web" target="__blank" underline="none">
          Storyset
        </Link>
        {" and "}
        <Link
          href="https://www.flaticon.com/"
          target="__blank"
          underline="none"
        >
          Flaticon
        </Link>
      </Typography>
    </div>
  );
};
