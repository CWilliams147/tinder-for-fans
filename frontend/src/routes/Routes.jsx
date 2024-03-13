import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register, { action as registerAction } from "./Register";
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
      ],
    },
  ];

  const router = createBrowserRouter([...publicRoutes]);

  return <RouterProvider router={router} />;
};

export default Routes;
