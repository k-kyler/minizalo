import { FC, RefObject } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface IScrollToTopButton {
  displayFloatButton: boolean;
  ref: RefObject<HTMLDivElement>;
}

export const ScrollToTopButton: FC<IScrollToTopButton> = ({
  ref,
  displayFloatButton,
}) => {
  const scrollToTopHandler = () => {
    ref.current ? (ref.current.scrollTop = 0) : null;
  };

  return (
    <Zoom in={displayFloatButton}>
      <Fab
        color="primary"
        className="search__scrollToTop"
        size="medium"
        onClick={scrollToTopHandler}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};
