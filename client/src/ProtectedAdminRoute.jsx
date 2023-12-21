import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const user = useSelector((state) => state.users.user);
  const isLoading = useSelector((state) => state.users.isLoading);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else if (user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
