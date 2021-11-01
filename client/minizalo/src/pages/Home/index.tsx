import { FC } from "react";
import { SlideType } from "../../typings/SlideType";
import "./Home.css";
import WelcomeGif from "../../assets/welcome.gif";
import { Slider } from "../../components/Slider";

export const Home: FC = () => {
  // Test data
  const sliderData: SlideType[] = [
    {
      image: WelcomeGif,
      title: "Welcome to MiniZalo!",
      description:
        "MiniZalo is a small and friendly chat application that inspired by Zalo",
      type: "welcome",
    },
    {
      image: "",
      title: "Simple but still have needed things for messaging",
      description: "Taking direct message or joining groups with your friends",
    },
    {
      image: "",
      title: "Upload media or files",
      description: "You can upload various types of file and media",
    },
  ];
  // End of test data

  return (
    <div className="home">
      <Slider sliderData={sliderData} />
    </div>
  );
};
