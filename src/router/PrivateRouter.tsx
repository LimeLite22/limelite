import { Navigate } from "react-router-dom";

interface IPrivateRouteProps {
  component: React.ComponentType;
  redirectTo?: string;
}
const PrivateRoute = ({
  component: Component,
  redirectTo = "/authentication",
}: IPrivateRouteProps) => {
  const isLogged = localStorage.getItem("isLogged") === "true";

  return isLogged ? <Component /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
