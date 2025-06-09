import { AppState } from "@src/store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {

  const authSelector = useSelector((state: AppState) => state.user);
  const isAuthenticated = !!authSelector.token; 

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
