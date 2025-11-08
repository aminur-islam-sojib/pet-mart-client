import Home from "../Pages/Home";
import Layout from "../Layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "../Pages/Registration";
import LoginForm from "../Pages/Login";

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
      {
        path: "/login",
        element: <LoginForm />,
      },
    ],
  },
]);
