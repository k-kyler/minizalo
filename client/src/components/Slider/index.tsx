import { FC, useEffect, useRef, useReducer } from "react";
import "./Slider.css";
import { SlideType } from "../../typings/SlideType";
import {
  SliderReducerType,
  SliderActionType,
  SliderActionsType,
} from "../../typings/SliderReducerType";
import { Slide } from "./Slide";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface ISlider {
  sliderData: SlideType[];
}

export const Slider: FC<ISlider> = ({ sliderData }) => {
  // Refs
  const slideRef = useRef<HTMLDivElement>(null);
  const sliderSlidesRef = useRef<HTMLDivElement>(null);
  // End of refs

  // Reducer
  const ACTIONS: SliderActionsType = {
    NEXT_SLIDE: "next_slide",
    PREVIOUS_SLIDE: "previous_slide",
  };

  const reducer = (state: SliderReducerType, action: SliderActionType) => {
    switch (action.type) {
      case ACTIONS.PREVIOUS_SLIDE:
        if (slideRef.current && sliderSlidesRef.current) {
          const slideComponentWidth = slideRef.current.offsetWidth;
          const numberOfSlides = sliderData.length;

          if (state.slideWidth === 0)
            return {
              slideWidth: -slideComponentWidth * (numberOfSlides - 1),
            };
          else
            return {
              slideWidth: state.slideWidth + slideComponentWidth,
            };
        }

      case ACTIONS.NEXT_SLIDE:
        if (slideRef.current && sliderSlidesRef.current) {
          const slideComponentWidth = slideRef.current.offsetWidth;
          const numberOfSlides = sliderData.length;
          const sliderSlidesWidth = slideComponentWidth * numberOfSlides;

          if (state.slideWidth === -sliderSlidesWidth + slideComponentWidth)
            return {
              slideWidth: 0,
            };
          else
            return {
              slideWidth: state.slideWidth - slideComponentWidth,
            };
        }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, { slideWidth: 0 });
  // End of reducer

  // Handle functions
  const switchSlideHandler = () => {
    if (sliderSlidesRef.current) {
      sliderSlidesRef.current.style.transform = `translateX(${state.slideWidth}px)`;
    }
  };

  const autoSlideHandler = () =>
    setInterval(() => dispatch({ type: "next_slide" }), 5000);
  // End of handle functions

  // Effects
  useEffect(() => {
    switchSlideHandler();
  }, [state.slideWidth]);

  useEffect(() => {
    autoSlideHandler();
    return clearInterval();
  }, []);
  // End of effects

  return (
    <div className="slider">
      {/* Arrow controllers */}
      <span
        className="slider__leftArrow"
        onClick={() => dispatch({ type: "previous_slide" })}
      >
        <ChevronLeftIcon color="disabled" />
      </span>
      <span
        className="slider__rightArrow"
        onClick={() => dispatch({ type: "next_slide" })}
      >
        <ChevronRightIcon color="disabled" />
      </span>

      {/* Slides */}
      <div className="slider__slides" ref={sliderSlidesRef}>
        {sliderData.map((slide, index) => (
          <Slide {...slide} key={index} ref={slideRef} />
        ))}
      </div>
    </div>
  );
};
