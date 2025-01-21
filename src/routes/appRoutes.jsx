import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./privateRoutes";
import { Spin } from "antd";
import { useAuth } from "../store";

// Lazy pages import
const LoginPage = lazy(() => import("../pages/auth/Login"));
const Managevendorspage = lazy(() =>
  import("../pages/pilotlinq/managevendors")
);
const Manageleapage = lazy(() => import("../pages/pilotlinq/manageLEA"));

const Manageschoolspage = lazy(() => import("../pages/LEA/manageSchools"));
const Vendorrequestspage = lazy(() => import("../pages/LEA/vendorRequests"));
const Approvedvendorspage = lazy(() => import("../pages/LEA/approvedVendors"));

const Managedatapage = lazy(() => import("../pages/School/manageData"));
const Schoolspropertypage = lazy(() =>
  import("../pages/School/schoolProperty")
);

const Learequestspage = lazy(() => import("../pages/Vendor/LEArequests"));
const Approvedleapage = lazy(() => import("../pages/Vendor/approvedLEA"));

function AppRoutes() {
  const role = useAuth((state) => state.user.role);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Navigate to={"/app" + getInitialPath(role)} />,
      },
      {
        path: "app",
        element: <PrivateRoute />,
        children: getRoutes(role),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
    {
      future: {
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: false,
      },
    }
  );

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Spin />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

function getRoutes(role) {
  switch (role) {
    case "Pilot_Linq":
      return [
        { path: " managevendors", element: <Managevendorspage /> },
        { path: "managelea", element: <Manageleapage /> },
      ];
    case "LEA":
      return [
        { path: "manageschools", element: <Manageschoolspage /> },
        { path: "vendorrequests", element: <Vendorrequestspage /> },
        { path: "approvedvendors", element: <Approvedvendorspage /> },
      ];
    case "School":
      return [
        { path: " managedata", element: <Managedatapage /> },
        { path: "schoolproperty", element: <Schoolspropertypage /> },
      ];
    case "Vendor":
      return [
        { path: "learequests", element: <Learequestspage /> },
        { path: "approvedlea", element: <Approvedleapage /> },
      ];

    default:
      return [];
  }
}

function getInitialPath(role) {
  switch (role) {
    case "Super_Admin":
      return "/dashboard";
    case "LEA_Admin":
      return "/dashboard";
    case "School_Admin":
      return "/dashboard";
    case "Parent":
      return "/attendance-recovery";
    case "Teacher":
      return "/recovery-requests";
    case "Student":
      return "/assignments";
    case "AttandanceCoordinator":
      return "/attendance-recovery-manual-form";
    case "Clerk":
      return "/attendance-recovery-manual-form";
    default:
      return "/";
  }
}

export default AppRoutes;
