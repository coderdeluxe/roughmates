import { Navigate } from "react-router-dom";
import { useAppSelector } from "../states/store";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector((state) => state.account.user);

  if (!user) return <Navigate to="/login" />;

  return children;
};
