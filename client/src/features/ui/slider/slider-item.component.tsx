import { forwardRef } from "react";
import "./slider-item.style.css";
import { SlideType } from "typings/slide.type";
import { Typography } from "@mui/material";

interface ISliderItem extends SlideType {}

export const SliderItem = forwardRef<HTMLDivElement, ISliderItem>(
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
