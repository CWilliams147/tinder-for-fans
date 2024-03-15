import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register, { action as registerAction } from "./Register";
import Login, { action as loginAction } from "./Login";
// import Matches from "./Matches";
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
        // {
        //   path: "/matches",
        //   element: <Matches />,
        // },
      ],
    },
  ];

  const router = createBrowserRouter([...publicRoutes]);

  return <RouterProvider router={router} />;
};

export default Routes;
