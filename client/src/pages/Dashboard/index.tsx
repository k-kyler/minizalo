import { FC } from "react";
import { SlideType } from "../../typings/SlideType";
import "./Dashboard.css";
import FirstSlide from "../../assets/slide_1.gif";
import SecondSlide from "../../assets/slide_2.gif";
import ThirdSlide from "../../assets/slide_3.gif";
import { Slider } from "../../components/Slider";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/UserSlice";
import { PageLoading } from "../../components/Loadings/PageLoading";

export const Dashboard: FC = () => {
  const { isFetching } = useAppSelector(selectUser);

  const sliderData: SlideType[] = [
    {
      image: FirstSlide,
      title: "Welcome to MiniZalo!",
      description:
        "MiniZalo is a small and friendly chat application that inspired by Zalo",
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

  return (
    <>
      {isFetching ? (
        <PageLoading />
      ) : (
        <div className="dashboard">
          <Slider sliderData={sliderData} />
        </div>
      )}
    </>
  );
};
