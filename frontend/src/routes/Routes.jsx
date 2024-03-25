import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register, { action as registerAction } from "./Register";
import Login, { action as loginAction } from "./Login";
import Logout, { action as logoutAction } from "./Logout";
import CreateProfile from "./CreateProfile";
import ContactPage from "./ContactPage";
import Matches from "./Matches";
import ProfileDisplay from "./ProfileDisplay";
import Layout from "../pages/Layout";
import Error from "../pages/Error";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import SquadPage from "./SquadPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "createprofile",
        element: <CreateProfile />,
      },
      {
        path: "logout",
        element: (
          // <ProtectedRoute>
          <Logout />
          // </ProtectedRoute>
        ),
        action: logoutAction,
      },
      {
        path: "contact",
        element: (
          // <ProtectedRoute>
          <ContactPage />
          // </ProtectedRoute>
        ),
      },
      {
        path: "profiledisplay",
        element: (
          // <ProtectedRoute>
          <ProfileDisplay />
          // </ProtectedRoute>
        ),
      },
      {
        path: "matches",
        element: <Matches />,
      },
      {
        path: "squad",
        element: <SquadPage />,
      },
    ],
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
