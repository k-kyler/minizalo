import { FC, useEffect } from "react";
import "./dashboard.style.css";
import { PageLoading, Slider } from "@features/ui";
import { useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/user.slice";
import { sliderData } from "@shared/slider-data";
import { useRedirect } from "@hooks/use-redirect";

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
