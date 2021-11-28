import { FC, useEffect } from "react";
import "./Dashboard.css";
import { Slider } from "../../components/Slider";
import { PageLoading } from "../../components/Loadings/PageLoading";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/UserSlice";
import { sliderData } from "../../constants/SliderData";
import { useRedirect } from "../../hooks/useRedirect";

export const Dashboard: FC = () => {
  const { isFetching, error } = useAppSelector(selectUser);

  const { setPathnameHandler } = useRedirect();

  useEffect(setPathnameHandler, []);

  return (
    <>
      {isFetching && !error ? (
        <PageLoading />
      ) : (
        <div className="dashboard">
          <Slider sliderData={sliderData} />
        </div>
      )}
    </>
  );
};
