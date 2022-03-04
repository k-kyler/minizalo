import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface IScrollToTopButton {}

export const ScrollToTopButton = () => {
  // const [displayFloatButton, setDisplayFloatButton] = useState(false);

  // const showFloatButtonHandler = () => {
  //   appRef.current && appRef.current.scrollTop !== 0
  //     ? setDisplayFloatButton(true)
  //     : setDisplayFloatButton(false);
  // };

  // const scrollToTopHandler = () => {
  //   appRef.current ? (appRef.current.scrollTop = 0) : null;
  // };

  return (
    <Zoom
    // in={displayFloatButton}
    >
      <Fab
        color="primary"
        className="search__scrollToTop"
        size="medium"
        // onClick={scrollToTopHandler}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};
