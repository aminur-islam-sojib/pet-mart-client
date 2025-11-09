import Home from "../Pages/Home";
import Layout from "../Layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "../Pages/Registration";
import LoginForm from "../Pages/Login";
import AddListing from "../Pages/AddListing";
import PetsAndSupply from "../Pages/PetsAndSupply";

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
      {
        path: "/add-listing",
        element: <AddListing />,
      },
      {
        path: "/pets-supplies",
        element: <PetsAndSupply />,
      },
    ],
  },
]);
