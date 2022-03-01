import { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/user.slice";

interface IPrivateRouteProps extends RouteProps {
  component: any;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const user = useAppSelector(selectUser);

  return (
    <Route
      {...rest}
      render={(props) =>
        !user.isFetching ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
