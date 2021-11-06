import { forwardRef } from "react";
import "./Slide.css";
import { SlideType } from "../../../typings/SlideType";
import { Typography } from "@mui/material";

interface ISlide extends SlideType {}

export const Slide = forwardRef<HTMLDivElement, ISlide>(
  ({ image, title, description }, ref) => {
    return (
      <div className="slide" ref={ref}>
        <div className="slide__image">
          <img src={image} />
        </div>

        <div className="slide__info">
          <Typography variant="h5" color="blue" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {description}
          </Typography>
        </div>
      </div>
    );
  }
);
