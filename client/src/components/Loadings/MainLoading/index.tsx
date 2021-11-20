import { FC } from "react";
import "./MainLoading.css";
import Logo from "../../../assets/logo.png";

export const MainLoading: FC = () => {
  return (
    <div className="mainLoading">
      <div className="mainLoading__inner">
        <img src={Logo} />
        <div className="mainLoading__balls">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
