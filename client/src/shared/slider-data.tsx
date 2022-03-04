import { SlideType } from "typings/slide.type";
import FirstSlide from "assets/slide_1.gif";
import SecondSlide from "assets/slide_2.gif";
import ThirdSlide from "assets/slide_3.gif";

export const sliderData: SlideType[] = [
  {
    image: FirstSlide,
    title: "Welcome to MiniZalo!",
    description:
      "MiniZalo is a small and friendly chat application that inspired by Zalo and Facebook",
  },
  {
    image: SecondSlide,
    title: "Simple but still have needed things for messaging",
    description: "Taking direct message or joining groups with your friends",
  },
  {
    image: ThirdSlide,
    title: "Upload media or files",
    description: "You can upload various types of file and media",
  },
];
