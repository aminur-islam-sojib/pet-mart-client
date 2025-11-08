import Home from "../Pages/Home";
import Layout from "../Layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "../Pages/Registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
    ],
  },
]);
