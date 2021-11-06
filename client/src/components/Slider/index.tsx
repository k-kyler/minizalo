import { FC } from "react";
import { SlideType } from "../../typings/SlideType";
import { Slide } from "./Slide";
import "./Slider.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface ISlider {
  sliderData: SlideType[];
}

export const Slider: FC<ISlider> = ({ sliderData }) => {
  return (
    <div className="slider">
      {/* Arrow controllers */}
      <span className="slider__leftArrow">
        <ChevronLeftIcon color="disabled" />
      </span>
      <span className="slider__rightArrow">
        <ChevronRightIcon color="disabled" />
      </span>

      {/* Slides */}
      <div className="slider__slides">
        <Slide {...sliderData[0]} />
      </div>

      {/* Dot controllers */}
      <div className="slider__dots"></div>
    </div>
  );
};
