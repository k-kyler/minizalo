import { Typography } from "@mui/material";
import { FC } from "react";
import { SlideType } from "../../../typings/SlideType";
import "./Slide.css";

interface ISlide extends SlideType {}

export const Slide: FC<ISlide> = ({ image, title, description, type }) => {
  return (
    <div className="slide">
      {/* Set link of resource */}
      {type === "welcome" ? (
        <a href="https://storyset.com/web">
          <img src={image} className="slide__image" />
        </a>
      ) : (
        <img src={image} className="slide__image" />
      )}

      <div className="slide__info">
        <Typography variant="h5" color="blue" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </div>
    </div>
  );
};
