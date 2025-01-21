import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store";
import AppSidebar from "../components/Layout/SideBar";
import AppHeader from "../components/Layout/Header";

function PrivateRoute() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  console.log("isAuthenticated", isAuthenticated);
  return isAuthenticated ? (
    <>
      <AppHeader />
      <div className="flex h-screen pt-[56px]">
        <AppSidebar />
        <div className="flex-grow overflow-auto bg-[#f9f9f9]">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
