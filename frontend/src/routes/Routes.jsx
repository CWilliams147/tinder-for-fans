import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register, { action as registerAction } from "./Register";
import Login, { action as loginAction } from "./Login";
import Logout, { action as logoutAction } from "./Logout";
import CreateProfile, { action as createProfileAction } from "./CreateProfile";
import Layout from "../pages/Layout";
import Error from "../pages/Error";
import Home from "./Home";

const Routes = () => {
  const publicRoutes = [
    {
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
          action: registerAction,
        },
        {
          path: "/login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "/logout",
          element: <Logout />,
          action: logoutAction,
        },
        {
          path: "/createprofile",
          element: <CreateProfile />,
          action: createProfileAction,
        },
      ],
    },
  ];

  const router = createBrowserRouter([...publicRoutes]);

  return <RouterProvider router={router} />;
};

export default Routes;
